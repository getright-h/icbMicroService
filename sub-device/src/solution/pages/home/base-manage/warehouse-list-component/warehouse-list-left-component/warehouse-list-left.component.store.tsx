import { IWarehouseListLeftState, TREE_MAP } from './warehouse-list-left.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { Key, useEffect, useContext } from 'react';
import * as React from 'react';
import { WarehouseListService } from '~/solution/model/services/warehouse-list.service';
import { IGlobalState } from '~/solution/context/global/global.interface';
import { GlobalContext } from '~/solution/context/global/global.provider';
import { dealWithTreeData, deleteTreeDataByKey, updateTreeData } from '~/framework/util/common/treeFunction';
import { QueryStoreOrganizationReturn } from '~/solution/model/dto/warehouse-list.dto';
import { EventDataNode } from 'antd/lib/tree';
import { WarehouseListManageContext } from '../warehouse-list.component';
import { openOrCloseAddWarehouseModal, setTreeSelectNode } from '../warehouse-list-redux/warehouse-list-action';
import { forkJoin } from 'rxjs';
import confirm from 'antd/lib/modal/confirm';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { ShowNotification } from '../../../../../../framework/util/common/showNotification';

export function useWarehouseListLeftStore() {
  const { dispatch } = useContext(WarehouseListManageContext);
  const { gState }: IGlobalState = useContext(GlobalContext);

  const warehouseListService: WarehouseListService = new WarehouseListService();
  const { state, setStateWrap, getState } = useStateStore(new IWarehouseListLeftState());
  useEffect(() => {
    queryOrganizationTypeListByTypeId();
  }, []);

  // 根据根据系统id查找机构类型
  function queryOrganizationTypeListByTypeId(id?: string) {
    warehouseListService.queryStoreOrganization({ typeId: gState.myInfo.typeId, id }).subscribe(res => {
      const treeData = dealWithTreeData<QueryStoreOrganizationReturn>(res, TREE_MAP, false);
      setStateWrap({
        treeData
      });
    });
  }

  // 添加仓库，显示弹窗
  function addWarehouse() {
    setStateWrap({ addWarehouseVisible: true });
  }

  /**
   *
   * 根据父级Id查询子级机构
   * @param {string} id 父级id
   */
  function queryStoreOrganizationListSub(parentId: string, treeNode: EventDataNode, resolve: Function) {
    forkJoin(
      warehouseListService.queryStoreOrganizationListSub({ parentId }),
      warehouseListService.queryStoreListByOrganizationId({ organizationId: parentId })
    ).subscribe((res: any) => {
      treeNode.children = [
        ...dealWithTreeData(res[1], TREE_MAP, true, warehouseAction),
        ...dealWithTreeData(res[0], TREE_MAP, false)
      ];
      setStateWrap({
        treeData: updateTreeData(state.treeData, treeNode.key, treeNode.children)
      });
      resolve();
    });
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
    const treeData = deleteTreeDataByKey(getState().treeData, id);
    setStateWrap({
      treeData: treeData
    });
  }

  function editWarehouse(element: any) {
    setStateWrap({
      addWarehouseVisible: true,
      isEditWarehouseModal: true,
      editWarehouseId: element.id
    });
  }

  // 点击展开加载数据
  function onLoadData(treeNode: EventDataNode | any): Promise<void> {
    return new Promise(resolve => {
      queryStoreOrganizationListSub(treeNode.id, treeNode, resolve);
    });
  }

  // 点击选择当前的仓库
  function onSelect(selectedKeys: Key[], e: { node: EventDataNode }) {
    setStateWrap({
      treeSelectedKeys: [e.node.key as string]
    });
    setTreeSelectNode(e.node, dispatch);
  }

  // 搜索得到想要的key获取当前仓库
  function getCurrentSelectInfo<T>(value: T, key: string) {
    setStateWrap({
      loadStoreOrganizationParams: {
        ...state.loadStoreOrganizationParams,
        [key]: value
      }
    });
    searchCurrentSelectInfo(getState().loadStoreOrganizationParams);
  }

  // 选择当前的机构信息，这边进行搜索
  function searchCurrentSelectInfo(params: { typeId: string; id: string }) {
    warehouseListService.queryStoreOrganization(params).subscribe(res => {
      const expandedKeys: string[] = [];
      res.forEach(item => {
        expandedKeys.push(item.id);
      });

      setStateWrap({
        expandedKeys
      });
    });
  }

  function closeAddWarehouseModal(isRefresh: boolean, id: string) {
    setStateWrap({
      isEditWarehouseModal: false,
      addWarehouseVisible: false,
      editWarehouseId: ''
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
    onLoadData,
    onSelect,
    getCurrentSelectInfo,
    addWarehouse,
    closeAddWarehouseModal,
    onExpand
  };
}
