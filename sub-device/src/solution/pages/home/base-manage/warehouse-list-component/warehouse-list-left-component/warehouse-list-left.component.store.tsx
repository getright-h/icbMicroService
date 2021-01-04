import { IWarehouseListLeftState } from './warehouse-list-left.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { Key, useContext, useRef } from 'react';
import React from 'react';
import { WarehouseListService } from '~/solution/model/services/warehouse-list.service';
import { deleteTreeDataByKey } from '~/framework/util/common/treeFunction';
import { EventDataNode } from 'antd/lib/tree';
import { WarehouseListManageContext } from '../warehouse-list.component';
import { setTreeSelectNode } from '../warehouse-list-redux/warehouse-list-action';
import confirm from 'antd/lib/modal/confirm';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { ShowNotification } from '../../../../../../framework/util/common/showNotification';
import { OrganizationExportFunction } from '~/solution/components/organization-controller-component/organization-controller.interface';

export function useWarehouseListLeftStore() {
  const { dispatch } = useContext(WarehouseListManageContext);
  const organizationControllerRef: { current: OrganizationExportFunction } = useRef();
  const warehouseListService: WarehouseListService = new WarehouseListService();
  const { state, setStateWrap } = useStateStore(new IWarehouseListLeftState());

  // 添加仓库，显示弹窗
  function addWarehouse() {
    setStateWrap({ addWarehouseVisible: true });
  }

  // 仓库的操作
  function warehouseAction(element: any) {
    return (
      <div className="actions">
        <a onClick={() => deleteWarehouse(element)} className="a-link">
          删除
        </a>
        <p></p>
        <a onClick={() => editWarehouse(element)} className="a-link">
          编辑
        </a>
      </div>
    );
  }

  const queryChildInfo = (item: any) => warehouseListService.queryStoreListByOrganizationId(item);

  // 删除仓库的弹窗
  function deleteWarehouse(element: any) {
    // 获取当前仓位
    confirm({
      title: '删除',
      icon: <ExclamationCircleOutlined />,
      content: `仓库下包含仓位 ${element.storePositionTotalNumber} 个，设备 ${element.materialTotalNumber} 个，删除仓库将清空所有信息，是否确认删除？`,
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

  function editWarehouse(element: any) {
    setStateWrap({
      addWarehouseVisible: true,
      isEditWarehouseModal: true,
      editWarehouseId: element.id
    });
  }

  // 点击选择当前的仓库
  function onSelect(selectedKeys: Key[], e: { node: EventDataNode }) {
    setStateWrap({
      treeSelectedKeys: [e.node.key as string]
    });
    setTreeSelectNode(e.node, dispatch);
  }

  function closeAddWarehouseModal(isRefresh: boolean, data: any, isEdit: boolean) {
    if (isRefresh) {
      setStateWrap({
        isEditWarehouseModal: false,
        addWarehouseVisible: false,
        editWarehouseId: ''
        // expandedKeys: []
      });
      // organizationControllerRef.current.queryOrganizationTypeListByTypeId();
      isEdit
        ? organizationControllerRef.current.alertCurrentTreeData(data.id, data.name)
        : organizationControllerRef.current.appendNewNodeToCurrentTreeData(data);
    } else {
      setStateWrap({
        isEditWarehouseModal: false,
        addWarehouseVisible: false,
        editWarehouseId: ''
      });
    }
  }

  function onExpand(expandedKeys: []) {
    setStateWrap({
      expandedKeys
    });
  }

  return {
    state,
    onSelect,
    addWarehouse,
    warehouseAction,
    closeAddWarehouseModal,
    onExpand,

    queryChildInfo,
    organizationControllerRef
  };
}
