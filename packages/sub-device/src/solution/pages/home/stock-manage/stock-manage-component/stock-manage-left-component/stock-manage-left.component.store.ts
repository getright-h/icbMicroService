import { IStockManageLeftState, TREE_MAP } from './stock-manage-left.interface';
import { useService, useStateStore } from '~/framework/aop/hooks/use-base-store';
import React, { useContext, useEffect } from 'react';
import { EventDataNode } from 'antd/lib/tree';
import { WarehouseListService } from '~/solution/model/services/warehouse-list.service';
import { setTreeSelectNode } from '../stock-list-redux/stock-list-action';
import { StockListManageContext } from '../stock-manage.component';

export function useStockManageLeftStore() {
  const { state, setStateWrap } = useStateStore(new IStockManageLeftState());
  const warehouseListService: WarehouseListService = useService(WarehouseListService);
  const { dispatch } = useContext(StockListManageContext);

  const queryChildInfo = (item: any) => warehouseListService.queryStoreListByOrganizationId(item);

  function onExpand(expandedKeys: []) {
    setStateWrap({
      expandedKeys
    });
  }

  function onSelect(selectedKeys: React.Key[], info: { node: EventDataNode }) {
    setStateWrap({
      treeSelectedKeys: [info.node.key as string]
    });
    setTreeSelectNode(info.node, dispatch);
  }

  return { state, onSelect, onExpand, queryChildInfo };
}
