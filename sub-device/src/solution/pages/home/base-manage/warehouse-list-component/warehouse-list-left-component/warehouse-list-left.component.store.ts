import { IWarehouseListLeftState, TREE_MAP } from './warehouse-list-left.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { Key, useEffect, useContext } from 'react';
import { WarehouseListService } from '~/solution/model/services/warehouse-list.service';
import { IGlobalState } from '~/solution/context/global/global.interface';
import { GlobalContext } from '~/solution/context/global/global.provider';
import { dealWithTreeData, updateTreeData } from '~/framework/util/common/treeFunction';
import { QueryStoreOrganizationReturn } from '~/solution/model/dto/warehouse-list.dto';
import { EventDataNode } from 'antd/lib/tree';
import { WarehouseListManageContext } from '../warehouse-list.component';
import { setModalvisible, setTreeSelectNode } from '../warehouse-list-redux/warehouse-list-action';

export function useWarehouseListLeftStore() {
  const { dispatch } = useContext(WarehouseListManageContext);
  const { gState }: IGlobalState = useContext(GlobalContext);

  const warehouseListService: WarehouseListService = new WarehouseListService();
  const { state, setStateWrap } = useStateStore(new IWarehouseListLeftState());
  useEffect(() => {
    queryOrganizationTypeListByTypeId(gState.myInfo.typeId);
  }, []);

  // 根据根据系统id查找机构类型
  function queryOrganizationTypeListByTypeId(typeId: string, id?: string) {
    warehouseListService.queryStoreOrganization({ typeId, id }).subscribe(res => {
      const treeData = dealWithTreeData<QueryStoreOrganizationReturn>(res, TREE_MAP);
      setStateWrap({
        treeData
      });
      setTreeSelectNode(treeData[0], dispatch);
    });
  }

  // 添加仓库，显示弹窗
  function addWarehouse() {
    setModalvisible({ modal: 'addWarehousevisible', value: true }, dispatch);
  }

  /**
   *
   * 根据父级Id查询子级机构
   * @param {string} id 父级id
   */
  function queryStoreOrganizationListSub(parentId: string, treeNode: EventDataNode, resolve: Function) {
    warehouseListService.queryStoreOrganizationListSub({ parentId }).subscribe((res: any) => {
      treeNode.children = dealWithTreeData(res, TREE_MAP);
      setStateWrap({
        treeData: updateTreeData(state.treeData, treeNode.key, treeNode.children)
      });
      resolve();
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
  }

  return { state, onLoadData, onSelect, getCurrentSelectInfo, addWarehouse };
}
