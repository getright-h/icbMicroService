import { IApprovalTemplateLeftState } from './approval-template-left.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useContext, Key, useRef } from 'react';
import * as React from 'react';
import { WarehouseListService } from '~/solution/model/services/warehouse-list.service';
import { EventDataNode } from 'antd/lib/tree';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { ShowNotification } from '~/framework/util/common';
import confirm from 'antd/lib/modal/confirm';
import { setTreeSelectNode } from '../appraval-template-redux/appraval-template-action';
import { AppravalTemplateManageContext } from '../appraval-template.component';
import { OrganizationExportFunction } from '~/solution/components/organization-controller-component/organization-controller.interface';

export function useApprovalTemplateLeftStore() {
  const { dispatch } = useContext(AppravalTemplateManageContext);
  const { state, setStateWrap } = useStateStore(new IApprovalTemplateLeftState());
  const organizationControllerRef: { current: OrganizationExportFunction } = useRef();
  const warehouseListService: WarehouseListService = new WarehouseListService();

  // 点击选择当前的组
  function onSelect(selectedKeys: Key[], e: { node: EventDataNode }) {
    setStateWrap({
      treeSelectedKeys: [e.node.key as string]
    });
    setTreeSelectNode(e.node, dispatch);
  }

  // 添加组，显示弹窗
  function addTemplateType() {
    setStateWrap({ addApprovalTypeVisible: true });
  }

  // 删除仓库的弹窗
  function deleteApprovalType(element: any) {
    // 获取当前仓位
    confirm({
      title: '删除',
      icon: <ExclamationCircleOutlined />,
      content: '删除组将清空所有信息，是否确认删除？',
      okText: '删除',
      onOk() {
        return new Promise(resolve => {
          confirmDeleteApprovalType(resolve, element);
        });
      },
      onCancel() {
        console.log('Cancel');
      }
    });
  }

  function confirmDeleteApprovalType(resolve: Function, element: any) {
    warehouseListService.deleteWarehouse({ storeId: element.id }).subscribe(() => {
      // 删除完毕后关闭弹窗，然后在当前的 treeData 上删除
      ShowNotification.success('删除成功！');
      resolve();
      deleteCurrentTreeData(element.id);
    });
  }

  // 在当前的tree上操作并显示相应的效果
  function deleteCurrentTreeData(id: string) {
    organizationControllerRef.current.deleteCurrentTreeData(id);
  }

  // 组的操作
  function approvalAction(element: any) {
    return (
      <div className="actions">
        <a onClick={() => deleteApprovalType(element)} className="a-link">
          删除
        </a>
        <p></p>
        <a onClick={() => editApprovalType(element)} className="a-link">
          编辑
        </a>
      </div>
    );
  }

  function editApprovalType(element: any) {
    setStateWrap({
      addApprovalTypeVisible: true,
      isEditApprovalModal: true,
      editApprovalId: element.id
    });
  }

  function closeAddTemplateTypeModal(isRefresh: boolean, id: string) {
    setStateWrap({
      isEditApprovalModal: false,
      addApprovalTypeVisible: false,
      editApprovalId: ''
    });

    isRefresh && organizationControllerRef.current.queryOrganizationTypeListByTypeId();
  }

  function onExpand(expandedKeys: []) {
    setStateWrap({
      expandedKeys
    });
  }

  const queryChildInfo = (item: any) => warehouseListService.queryStoreListByOrganizationId(item);

  return {
    state,
    addTemplateType,
    approvalAction,
    onSelect,
    closeAddTemplateTypeModal,
    organizationControllerRef,
    onExpand,
    queryChildInfo
  };
}
