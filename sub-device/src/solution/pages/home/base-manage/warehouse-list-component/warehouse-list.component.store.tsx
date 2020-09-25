import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { IWarehouseListState } from './warehouse-list.interface';
import { useEffect, useRef } from 'react';
import * as React from 'react';
import { WarehouseListService } from '~/solution/model/services/warehouse-list.service';
import { QueryStorePositionReturn, StorePositionPagedDataList } from '~/solution/model/dto/warehouse-list.dto';
import { EventDataNode } from 'antd/lib/tree';
import { ShowNotification } from '~/framework/util/common';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import confirm from 'antd/lib/modal/confirm';
export function useWarehouseListStore(warehouseListState: { currentSelectNode: EventDataNode }) {
  const { state, setStateWrap, getState } = useStateStore(new IWarehouseListState());
  const warehouseListService = useRef(new WarehouseListService());

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
        setStateWrap({
          tableData: data.storePositionPagedList.dataList,
          total: data.storePositionPagedList.total,
          totalAlarm: data.totalAlarm,
          totalNumber: data.totalNumber + ''
        });
      });
  }

  function handleFormDataChange(value: { target: { value: string } }, key: string) {
    setStateWrap({
      searchForm: {
        ...state.searchForm,
        [key]: value.target.value
      }
    });
  }

  function callbackAction(row: StorePositionPagedDataList, actionType: string) {
    switch (actionType) {
      case '编辑':
        break;
      case '删除':
        deleteWarehouse(row);
        break;
      default:
        break;
    }
  }

  // 删除仓库的弹窗
  function deleteWarehouse(element: StorePositionPagedDataList) {
    // 获取当前仓位
    confirm({
      title: '删除',
      icon: <ExclamationCircleOutlined />,
      content: `仓位下包含设备 ${element.stockNumber} 个，删除仓位将清空所有信息，是否确认删除？`,
      okText: '删除',
      onOk() {
        return new Promise((resolve, reject) => {
          deleteShippingSpace(resolve, reject, element);
        });
      },
      onCancel() {
        console.log('Cancel');
      }
    });
  }
  // 删除仓位
  function deleteShippingSpace(resolve: Function, reject: Function, row: StorePositionPagedDataList) {
    console.log(row);

    warehouseListService.current.deleteStorePosition({ storeId: row.storePositionId, id: row.id }).subscribe(
      () => {
        ShowNotification.success('删除成功');
        resolve();
        setStateWrap({
          searchForm: {
            ...state.searchForm,
            index: 1,
            name: ''
          }
        });
        getTableData();
      },
      () => {
        reject();
      }
    );
  }
  return { state, changeTablePageIndex, callbackAction, handleFormDataChange, getTableData };
}
