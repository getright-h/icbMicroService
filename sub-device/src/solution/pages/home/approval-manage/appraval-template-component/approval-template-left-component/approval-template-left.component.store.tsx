import { IApprovalTemplateLeftState } from './approval-template-left.interface';
import { useStateStore, useService } from '~/framework/aop/hooks/use-base-store';
import { useContext, Key, useRef, useEffect } from 'react';
import * as React from 'react';
import { WarehouseListService } from '~/solution/model/services/warehouse-list.service';
import { EventDataNode } from 'antd/lib/tree';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { ShowNotification } from '~/framework/util/common';
import confirm from 'antd/lib/modal/confirm';
import { setTreeSelectNode } from '../appraval-template-redux/appraval-template-action';
import { AppravalTemplateManageContext } from '../appraval-template.component';
import { OrganizationExportFunction } from '~/solution/components/organization-controller-component/organization-controller.interface';
import { dealWithTreeData, updateTreeData, deleteTreeDataByKey } from '~/framework/util/common/treeFunction';
import { QueryStoreOrganizationReturn } from '~/solution/model/dto/warehouse-list.dto';
import { IGlobalState } from '~/solution/context/global/global.interface';
import { GlobalContext } from '~/solution/context/global/global.provider';
import { TREE_MAP } from '../appraval-template.interface';
import { ApprovalManageService } from '~/solution/model/services/approval-manage.service';
import { DataNode } from 'rc-tree/lib/interface';

export function useApprovalTemplateLeftStore() {
  const { dispatch, reduxState } = useContext(AppravalTemplateManageContext);
  const { state, setStateWrap, getState } = useStateStore(new IApprovalTemplateLeftState());
  const organizationControllerRef: { current: OrganizationExportFunction } = useRef();
  const warehouseListService: WarehouseListService = new WarehouseListService();
  const approvalManageService: ApprovalManageService = useService(ApprovalManageService);
  const { gState }: IGlobalState = useContext(GlobalContext);

  useEffect(() => {
    queryOrganizationTypeListByTypeId();
  }, []);

  // 根据根据系统id查找机构类型
  function queryOrganizationTypeListByTypeId(id?: string) {
    warehouseListService.queryStoreOrganization({ typeId: gState.myInfo.typeId, id }).subscribe(res => {
      const treeData = dealWithTreeData<QueryStoreOrganizationReturn>(res, TREE_MAP, false, undefined);
      setStateWrap({
        treeData,
        organazationList: res
      });
    });
  }

  // 点击展开加载数据
  function onLoadData(treeNode: EventDataNode | any) {
    //根据 集团信息获取
    return new Promise<void>(resolve => {
      queryStoreOrganizationListSub(treeNode.id, treeNode, resolve);
    });
  }

  function onChooseAll() {
    setTreeSelectNode(
      {
        isAll: true
      },
      dispatch
    );
    setStateWrap({
      treeSelectedKeys: []
    });
  }

  function queryStoreOrganizationListSub(parentId: string, treeNode: EventDataNode | any, resolve: Function) {
    approvalManageService.queryApprovalGroupList({ organizationId: parentId }).subscribe(res => {
      const queryChildInfoData: DataNode[] = dealWithTreeData(
        res,
        {
          title: 'name',
          key: 'id'
        },
        true,
        groupAction
      );

      treeNode.children = queryChildInfoData;
      const treeData = updateTreeData(state.treeData, treeNode.key, treeNode.children);

      setStateWrap({
        treeData
      });
      resolve();
    });
  }

  // 组的操作
  function groupAction(element: any) {
    return (
      <div className="actions">
        <a onClick={() => deleteGroup(element)} className="a-link">
          删除
        </a>
        <p></p>
        <a onClick={() => editGroup(element)} className="a-link">
          编辑
        </a>
      </div>
    );
  }

  function deleteGroup(element: any) {
    // 删除组的弹窗
    confirm({
      title: '删除',
      icon: <ExclamationCircleOutlined />,
      content: '是否删除当前组',
      okText: '删除',
      onOk() {
        return new Promise(resolve => {
          confirmDeleteWarehouse(resolve, element);
        });
      },
      onCancel() {
        console.log('Cancel');
      }
    });
  }

  function confirmDeleteWarehouse(resolve: Function, element: any) {
    approvalManageService.deleteApprovalGroup({ id: element.id }).subscribe(() => {
      ShowNotification.success('删除成功');
      console.log(getState().treeData);
      const treeData = deleteTreeDataByKey(getState().treeData, element.id);

      setStateWrap({
        treeData: treeData
      });
      resolve();
    });
  }

  // 点击选择当前的组
  function onSelect(selectedKeys: Key[], e: { node: EventDataNode }) {
    setStateWrap({
      treeSelectedKeys: [e.node.key as string]
    });
    setTreeSelectNode({ isAll: false, node: e.node }, dispatch);
  }

  // 添加组，显示弹窗
  function addTemplateType() {
    setStateWrap({ addApprovalTypeVisible: true });
  }

  function editGroup(element: any) {
    setStateWrap({
      addApprovalTypeVisible: true,
      isEditApprovalModal: true,
      groupId: element.id
    });
  }

  function closeAddTemplateTypeModal(isRefresh: boolean, id: string) {
    setStateWrap({
      isEditApprovalModal: false,
      addApprovalTypeVisible: false,
      groupId: '',
      expandedKeys: []
    });
    isRefresh && queryOrganizationTypeListByTypeId();
  }

  function onExpand(expandedKeys: []) {
    setStateWrap({
      expandedKeys
    });
  }

  return {
    state,
    addTemplateType,
    onSelect,
    closeAddTemplateTypeModal,
    organizationControllerRef,
    onExpand,
    onChooseAll,
    onLoadData
  };
}
