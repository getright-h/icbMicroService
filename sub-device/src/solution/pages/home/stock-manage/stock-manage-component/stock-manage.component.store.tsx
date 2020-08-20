import { IStockManageState, ModalType } from './stock-manage.interface';
import { useStateStore, useService } from '~/framework/aop/hooks/use-base-store';
import React, { useEffect } from 'react';
import { ShowNotification } from '~/framework/util/common';
import { StockManageService } from '~/solution/model/services/stock-manage.service';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

export function useStockManageStore() {
  const { state, setStateWrap } = useStateStore(new IStockManageState());
  const stockManageService: StockManageService = useService(StockManageService);

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
          type: '默认仓位',
          number: 'KR8267',
          card: '44448989777777',
          list: '65848974987',
          location: '第一排第一格',
          createTime: '2020-08-27 00:00:00',
          stayTime: '100d',
          status: '正常'
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

  function onSelectRows(selectedRowKeys: any) {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
  }

  function callbackAction<T>(actionType: number, data?: T) {
    setStateWrap({ currentId: data ? data.id : '' });
    switch (actionType) {
      case ModalType.ADD:
        setStateWrap({ stockInVisible: true });
        break;
      case ModalType.EDIT:
        setStateWrap({ deviceEditVisible: true });
        break;
      case ModalType.LOST:
        Modal.confirm({
          title: (
            <span>
              是否确认设备已遗失？遗失设备可在<a>设备路线表</a>中查看
            </span>
          ),
          icon: <ExclamationCircleOutlined />,
          onOk: () =>
            new Promise((resolve, reject) => {
              //   stockManageService.delete(data.id).subscribe(
              //     (res: any) => {
              //       ShowNotification.success('已删除！');
              resolve();
              //     },
              //     (err: any) => {
              //       ShowNotification.error(err);
              //       reject();
              //     }
              //   );
            })
        });
        break;
      case ModalType.DELETE:
        Modal.confirm({
          title: '是否确认删除设备？删除后无法恢复',
          icon: <ExclamationCircleOutlined />,
          onOk: () =>
            new Promise((resolve, reject) => {
              //   stockManageService.delete(data.id).subscribe(
              //     (res: any) => {
              //       ShowNotification.success('已删除！');
              resolve();
              //     },
              //     (err: any) => {
              //       ShowNotification.error(err);
              //       reject();
              //     }
              //   );
            })
        });
        break;
      case ModalType.IMPORT:
        setStateWrap({ bulkImportVisible: true });
        break;
      case ModalType.EXPORT:
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

  function clearSearchform() {}

  function modalCancel() {
    setStateWrap({ stockInVisible: false, bulkImportVisible: false, deviceEditVisible: false });
  }

  return {
    state,
    onSelectRows,
    callbackAction,
    changeTablePageIndex,
    handleSearchFormChange,
    searchClick,
    clearSearchform,
    modalCancel
  };
}
