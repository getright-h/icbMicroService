import * as React from 'react';
import { IWarehouseManageState, ModalType } from './warehouse-manage.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect } from 'react';
import { WarehouseManageService } from '~/solution/model/services/warehouse-manage.service';
import { ShowNotification } from '~/framework/util/common';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

export function useWarehouseManageStore() {
  const { state, setStateWrap } = useStateStore(new IWarehouseManageState());
  const warehouseManageService: WarehouseManageService = new WarehouseManageService();

  useEffect(() => {
    getTableData();
  }, []);

  function getTableData() {
    // setStateWrap({ isLoading: true });
    // warehouseManageService.__getTableData__(state.searchForm).subscribe(
    //   res => {
    //     setStateWrap({ tableData: res.dataList, total: res.total, isLoading: false });
    //   },
    //   err => {
    //     setStateWrap({ isLoading: false });
    //     ShowNotification.error(err);
    //   }
    // );
    setStateWrap({
      tableData: [
        {
          id: '826',
          name: '默认仓位',
          stock: 8,
          location: '第一排第一格',
          isDefault: true,
          stockWarn: '不足',
          longWarn: '已报警'
        }
      ]
    });
  }

  function handleSearchFormChange(value: any, valueType: string) {
    setStateWrap({
      searchForm: {
        ...state.searchForm,
        [valueType]: value
      }
    });
  }
  function searchClick() {
    const { searchForm } = state;
    searchForm.page = 1;
    setStateWrap({ searchForm });
    getTableData();
  }

  function callbackAction<T>(actionType: number, data?: T) {
    setStateWrap({ currentId: data ? data.id : '' });
    switch (actionType) {
      case ModalType.CREATE:
        setStateWrap({
          visibleModal: true
        });
        break;
      case ModalType.EDIT:
        setStateWrap({
          visibleModal: true
        });
        break;
      case ModalType.DELETE:
        Modal.confirm({
          title: '仓位下包含设备XX个，删除仓位将清空所有信息，是否确认删除？',
          icon: <ExclamationCircleOutlined />,
          onOk: () =>
            new Promise((resolve, reject) => {
              // warehouseManageService.delete(data.id).subscribe(
              //   (res: any) => {
              //     ShowNotification.success('已删除！');
              resolve();
              //   },
              //   (err: any) => {
              //     ShowNotification.error(err);
              //     reject();
              //   }
              // );
            })
        });
        break;
      default:
        break;
    }
  }

  function changeTablePageIndex(index: number, pageSize: number) {
    const { searchForm } = state;
    searchForm.page = index;
    searchForm.size = pageSize;
    setStateWrap({ searchForm });
    getTableData();
  }

  function modalClose() {
    setStateWrap({ visibleModal: false });
  }

  return {
    state,
    callbackAction,
    changeTablePageIndex,
    searchClick,
    modalClose,
    handleSearchFormChange
  };
}
