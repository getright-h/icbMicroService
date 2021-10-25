import { IDirectiveListState, ModalType, SORT_LIST } from './permanent-list.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { Form } from 'antd';
import { OrderReportService } from '~/solution/model/services/report-order.service';
import { useEffect, useRef } from 'react';
import moment from 'moment';
import { setState } from '~/framework/microAPP/appStore';

export function useDirectiveListStore() {
  const { state, setStateWrap, getState } = useStateStore(new IDirectiveListState());
  const orderReportService: OrderReportService = new OrderReportService();
  const [searchForm] = Form.useForm();
  const page_index = useRef(1);
  const sort = useRef(-1);
  useEffect(() => {
    initSearchForm();
  }, []);

  function getTableData() {
    setStateWrap({ isLoading: true });
    const { pageSize, timeInfo } = getState();
    orderReportService
      .queryResidentPagedList({
        ...searchForm.getFieldsValue(),
        beginTime: timeInfo[0] ? moment(timeInfo[0]).valueOf() : 0,
        endTime: timeInfo[1] ? moment(timeInfo[1]).valueOf() : 0,
        index: page_index.current,
        size: pageSize,
        sort: sort.current,
        orderBy: 1
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
    page_index.current = 1;
    setStateWrap({ pageIndex: 1 });
    getTableData();
  }

  function initSearchForm() {
    searchForm.resetFields();
    setStateWrap({
      timeInfo: [
        moment()
          .startOf('month')
          .format('YYYY-MM-DD HH:mm:ss'),
        moment().format('YYYY-MM-DD HH:mm:ss')
      ]
    });
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
    page_index.current = pageIndex;
    console.log(page_index.current);

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
      setStateWrap({ timeInfo: !!data[0] ? data : [] });
    }

    if (type == 'organizationId') {
      const { organizationId } = data;
      searchForm.setFieldsValue({ organizationId: organizationId });
    }
  }
  function handleTableOnchange(e: any, emptyObj: {}, sortObj: any, action: { action: string; currentDataSource: [] }) {
    const { field } = sortObj;
    const { sortInfo } = state;
    const currentSort = SORT_LIST.find(_ => _.type === field);
    if (!currentSort || action.action !== 'sort') return;
    console.log(field, sortInfo?.key, sortInfo?.key === field && action.action === 'sort');

    // 如果当前的sort配置与当前点击的排序一样则取消排序
    //
    page_index.current = 1;
    if (sortInfo?.key === field && action.action === 'sort') {
      console.log('重置');
      sort.current = -1;

      setStateWrap({
        sort: -1,
        sortInfo: {
          key: '',
          type: ''
        },
        pageIndex: 1
      });
    } else {
      console.log('搜索');
      action.action !== 'sort' && (page_index.current = 1);
      sort.current = currentSort.sort;
      setStateWrap({
        sortInfo: {
          key: field,
          type: 'descend'
        },
        pageIndex: 1
      });
    }
    getTableData();
  }

  function handleExport(value: string) {
    const { timeInfo, pageSize } = getState();
    orderReportService
      .exportResidentStatisticsList({
        ...searchForm.getFieldsValue(),
        beginTime: timeInfo[0] ? moment(timeInfo[0]).valueOf() : 0,
        endTime: timeInfo[1] ? moment(timeInfo[1]).valueOf() : 0,
        index: page_index.current,
        size: pageSize,
        sort: sort.current,
        orderBy: 1,
        name: value
      })
      .subscribe(
        res => {
          setState({ showTaskCenter: true });
          handleExportVisible(false);
        },
        err => {
          handleExportVisible(false);
        }
      );
  }

  function handleExportVisible(visible: boolean) {
    visible && searchClick();
    setStateWrap({ exportVisible: visible });
  }

  return {
    state,
    searchForm,
    initSearchForm,
    callbackAction,
    changeTablePageIndex,
    searchClick,
    getCurrentSelectInfo,
    handleTableOnchange,
    handleExport,
    handleExportVisible
  };
}
