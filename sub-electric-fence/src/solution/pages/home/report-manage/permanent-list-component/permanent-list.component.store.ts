import { IDirectiveListState, ModalType, SORT_LIST } from './permanent-list.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { Form } from 'antd';
import { OrderReportService } from '~/solution/model/services/report-order.service';
import { useEffect, useRef } from 'react';
import moment from 'moment';

export function useDirectiveListStore() {
  const { state, setStateWrap, getState } = useStateStore(new IDirectiveListState());
  const orderReportService: OrderReportService = new OrderReportService();
  const [searchForm] = Form.useForm();

  useEffect(() => {
    initSearchForm();
  }, []);

  function getTableData() {
    setStateWrap({ isLoading: true });
    const { pageIndex, pageSize, timeInfo } = getState();
    orderReportService
      .queryResidentPagedList({
        ...searchForm.getFieldsValue(),
        beginTime: timeInfo[0] ? moment(timeInfo[0]).valueOf() : 0,
        endTime: timeInfo[1] ? moment(timeInfo[1]).valueOf() : 0,
        index: pageIndex,
        size: pageSize,
        sort: state.sort
      })
      .subscribe(
        res => {
          setStateWrap({ tableData: res.dataList, total: res.total, isLoading: false });
        },
        err => {
          setStateWrap({ isLoading: false });
        }
      );
  }

  function searchClick() {
    setStateWrap({ pageIndex: 1 });
    getTableData();
  }

  function initSearchForm() {
    searchForm.resetFields();
    setStateWrap({ timeInfo: [] });
    searchClick();
  }

  function callbackAction<T>(actionType: number, data?: T) {
    setStateWrap({ currentId: data ? data.id : '' });
    switch (actionType) {
      case ModalType.CREATE:
        setStateWrap({});
        break;
      case ModalType.EDIT:
        setStateWrap({});
        break;
      default:
        break;
    }
  }

  function changeTablePageIndex(pageIndex: number, pageSize: number) {
    setStateWrap({ pageIndex, pageSize });
    getTableData();
  }

  // function handleModalCancel(isSuccess = false) {
  //   setStateWrap({});
  //   isSuccess && searchClick();
  // }

  function getCurrentSelectInfo(data: any, type: string) {
    // if (type == 'strValue') {
    //   const { deviceCode = '' } = Array.isArray(data?.info?.deviceList) && data?.info?.deviceList[0];
    //   searchForm.setFieldsValue({ deviceCode: deviceCode });
    // }
    if (type == 'time') {
      // let beginTime, endTime;
      // data[0] ? (beginTime = Date.parse(data[0])) : (beginTime = 0);
      // data[1] ? (endTime = Date.parse(data[1])) : (endTime = 0);
      // searchForm.setFieldsValue({ beginTime: beginTime });
      // searchForm.setFieldsValue({ endTime: endTime });
      setStateWrap({ timeInfo: data });
    }

    if (type == 'organizationId') {
      const { organizationId } = data;
      searchForm.setFieldsValue({ organizationId: organizationId });
    }
  }
  function handleTableOnchange(e: any, a: any, sortObj: any) {
    const { field } = sortObj;
    const { sortInfo } = state;
    const currentSort = SORT_LIST.find(_ => _.type === field);
    if (!currentSort) return;

    // 如果当前的sort配置与当前点击的排序一样则取消排序
    if (sortInfo?.key === field) {
      setStateWrap({
        sort: 0,
        sortInfo: {
          key: '',
          type: ''
        }
      });
    } else {
      setStateWrap({
        sort: currentSort.sort,
        sortInfo: {
          key: field,
          type: 'descend'
        }
      });
    }
    searchClick();
  }
  return {
    state,
    searchForm,
    initSearchForm,
    callbackAction,
    changeTablePageIndex,
    searchClick,
    getCurrentSelectInfo,
    handleTableOnchange
  };
}
