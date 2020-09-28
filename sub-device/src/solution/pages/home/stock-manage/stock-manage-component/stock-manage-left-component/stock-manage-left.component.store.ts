import { IStockManageLeftProps, IStockManageLeftState, TREE_MAP } from './stock-manage-left.interface';
import { useService, useStateStore } from '~/framework/aop/hooks/use-base-store';
import React, { useContext, useEffect } from 'react';
import { EventDataNode } from 'antd/lib/tree';
import { dealWithTreeData, updateTreeData } from '~/framework/util/common/treeFunction';
import { WarehouseListService } from '~/solution/model/services/warehouse-list.service';
import { forkJoin } from 'rxjs';
import { IGlobalState } from '~/solution/context/global/global.interface';
import { GlobalContext } from '~/solution/context/global/global.provider';
import { QueryStoreOrganizationReturn } from '~/solution/model/dto/warehouse-list.dto';

export function useStockManageLeftStore(props: IStockManageLeftProps) {
  const { state, setStateWrap, getState } = useStateStore(new IStockManageLeftState());
  const { gState }: IGlobalState = useContext(GlobalContext);
  const warehouseListService: WarehouseListService = useService(WarehouseListService);

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
      treeNode.children = [...dealWithTreeData(res[1], TREE_MAP, true), ...dealWithTreeData(res[0], TREE_MAP, false)];
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

  function onExpand(expandedKeys: []) {
    setStateWrap({
      expandedKeys
    });
  }

  function onSelect(selectedKeys: React.Key[], info: { node: EventDataNode }) {
    props.getSelectTreeNode(info.node);
  }

  return { state, onLoadData, onSelect, getCurrentSelectInfo, onExpand };
}
