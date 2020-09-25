import { IInOutStockState, ModalType } from './in-out-stock.interface';
import { useService, useStateStore } from '~/framework/aop/hooks/use-base-store';
import { StockManageService } from '~/solution/model/services/stock-manage.service';
import { useEffect } from 'react';
import { ShowNotification } from '~/framework/util/common';
import { Form } from 'antd';
import moment from 'moment';

export function useInOutStockStore() {
  const { state, setStateWrap } = useStateStore(new IInOutStockState());
  const stockManageService: StockManageService = useService(StockManageService);
  const [searchForm] = Form.useForm();

  useEffect(() => {
    initSearchform();
    getTableData();
  }, []);

  function getTableData() {
    setStateWrap({ isLoading: true });
    stockManageService
      .queryInOutRecordList({
        ...searchForm.getFieldsValue(),
        beginTime: state.timeInfo[0] ? moment(state.timeInfo[0]).valueOf() : 0,
        endTime: state.timeInfo[1] ? moment(state.timeInfo[1]).valueOf() : 0,
        index: state.pageIndex,
        size: state.pageSize
      })
      .subscribe(
        res => {
          setStateWrap({
            tableData: res.pagedList?.dataList,
            total: res.total,
            isLoading: false,
            statistics: res.statistics
          });
        },
        err => {
          setStateWrap({ isLoading: false });
          ShowNotification.error(err);
        }
      );
  }

  function getDateTimeInfo(timeInfo: any) {
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
    searchForm.setFieldsValue({ type: -1 });
    setStateWrap({ timeInfo: [] });
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
