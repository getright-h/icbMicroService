import { IInOutStockState, ModalType } from './in-out-stock.interface';
import { useService, useStateStore } from '~/framework/aop/hooks/use-base-store';
import { StockManageService } from '~/solution/model/services/stock-manage.service';
import { useEffect } from 'react';
import { Form } from 'antd';
import moment from 'moment';

export function useInOutStockStore() {
  const { state, setStateWrap, getState } = useStateStore(new IInOutStockState());
  const stockManageService: StockManageService = useService(StockManageService);
  const [searchForm] = Form.useForm();

  useEffect(() => {
    initSearchform();
  }, []);

  function getTableData() {
    setStateWrap({ isLoading: true });
    const { pageIndex, pageSize, timeInfo } = getState();
    stockManageService
      .queryInOutRecordList({
        ...searchForm.getFieldsValue(),
        beginTime: timeInfo[0] ? moment(timeInfo[0] + ' 00:00:00').valueOf() : 0,
        endTime: timeInfo[1] ? moment(timeInfo[1] + ' 23:59:59').valueOf() : 0,
        index: pageIndex,
        size: pageSize
      })
      .subscribe(
        res => {
          setStateWrap({
            tableData: res.pagedList?.dataList,
            total: res.pagedList?.total,
            isLoading: false,
            statistics: res.statistics
          });
        },
        err => {
          setStateWrap({ isLoading: false });
        }
      );
  }

  function getDateTimeInfo(timeInfo: any) {
    console.log('time', timeInfo);

    setStateWrap({ timeInfo });
  }

  function searchClick() {
    setStateWrap({ pageIndex: 1 });
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

  function changeTablePageIndex(pageIndex: number, pageSize: number) {
    setStateWrap({ pageIndex, pageSize });
    getTableData();
  }

  function modalClose() {
    setStateWrap({ recordVisible: false, deviceVisible: false });
  }

  function initSearchform() {
    searchForm.resetFields();
    setStateWrap({ timeInfo: [], pageIndex: 1 });
    getTableData();
  }

  return {
    state,
    searchForm,
    callbackAction,
    changeTablePageIndex,
    searchClick,
    modalClose,
    initSearchform,
    getDateTimeInfo
  };
}
