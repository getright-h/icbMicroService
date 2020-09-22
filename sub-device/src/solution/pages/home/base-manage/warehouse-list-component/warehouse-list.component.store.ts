import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { IWarehouseListState } from './warehouse-list.interface';
import { useEffect, useRef } from 'react';
import { WarehouseListService } from '~/solution/model/services/warehouse-list.service';
import { QueryStorePositionReturn } from '~/solution/model/dto/warehouse-list.dto';
import { EventDataNode } from 'antd/lib/tree';
export function useWarehouseListStore(warehouseListState: { currentSelectNode: EventDataNode }) {
  const { state, setStateWrap, getState } = useStateStore(new IWarehouseListState());
  const warehouseListService = useRef(new WarehouseListService());
  useEffect(() => {
    // getTableData();
  }, []);

  useEffect(() => {
    // 获取表单的数据，清空当前条件
    if (warehouseListState.currentSelectNode) {
      setStateWrap(
        {
          searchForm: {
            ...state.searchForm,
            index: 1,
            name: '',
            storeId: warehouseListState.currentSelectNode.key as string
          }
        },
        () => {
          getTableData();
        }
      );
    }
  }, [warehouseListState.currentSelectNode]);

  function changeTablePageIndex(index: number, pageSize: number) {
    // 分页，切换页面
    getTableData();
  }
  function getTableData() {
    warehouseListService.current
      .queryStorePositionPagedListByStoreId(getState().searchForm)
      .subscribe((data: QueryStorePositionReturn) => {
        console.log(data);
      });
  }

  function handleFormDataChange<T>(value: T, key: string) {
    setStateWrap({
      searchForm: {
        ...state.searchForm,
        [key]: value
      }
    });
  }

  function callbackAction() {}
  return { state, changeTablePageIndex, callbackAction, handleFormDataChange, getTableData };
}
