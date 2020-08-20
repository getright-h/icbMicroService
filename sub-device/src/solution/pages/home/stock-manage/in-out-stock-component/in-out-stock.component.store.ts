import { IInOutStockState, ModalType } from './in-out-stock.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { StockManageService } from '~/solution/model/services/stock-manage.service';
import { useEffect } from 'react';

export function useInOutStockStore() {
  const { state, setStateWrap } = useStateStore(new IInOutStockState());
  const stockManageService: StockManageService = new StockManageService();

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
          name: 'A仓库',
          type: '出库',
          number: 8,
          creater: '小二',
          createTime: 'xxxx-xx-xx 00:00:00'
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
      case ModalType.RECORD:
        setStateWrap({
          recordVisible: true
        });
        break;
      case ModalType.DEVICE:
        setStateWrap({
          deviceVisible: true
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
    setStateWrap({ recordVisible: false, deviceVisible: false });
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
