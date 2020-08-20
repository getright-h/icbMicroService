import * as React from 'react';
import { IPurchaseOrderState, ModalType } from './purchase-order.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect } from 'react';
import { ShowNotification } from '~/framework/util/common';
import { StockManageService } from '~/solution/model/services/stock-manage.service';

export function usePurchaseOrderStore() {
  const { state, setStateWrap } = useStateStore(new IPurchaseOrderState());
  const stockManageService: StockManageService = new StockManageService();

  useEffect(() => {
    getTableData();
  }, []);

  function getTableData() {
    // setStateWrap({ isLoading: true });
    // purchaseOrderService.__getTableData__(state.searchForm).subscribe(
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
          id: '827',
          orgName: 'A机构',
          orderNum: '958267',
          orderName: 'xx无线设备采购',
          product: 'ICB001-OBD',
          total: 10,
          amount: '100.00',
          createTime: '2020-08-27 00:00:00',
          creater: '吴小二'
        }
      ]
    });
  }

  function onChange(value: any, valueType: string) {
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
    setStateWrap({ currentId: data.id });
    switch (actionType) {
      case ModalType.CREATE:
        setStateWrap({ editVisible: true });
        break;
      case ModalType.EDIT:
        setStateWrap({ editVisible: true });
        break;
      case ModalType.DETAIL:
        setStateWrap({ detailVisible: true });
        break;
      case ModalType.DELETE:
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

  function handleModalCancel() {
    setStateWrap({ editVisible: false, detailVisible: false });
  }
  return {
    state,
    callbackAction,
    changeTablePageIndex,
    searchClick,
    handleModalCancel,
    onChange
  };
}
