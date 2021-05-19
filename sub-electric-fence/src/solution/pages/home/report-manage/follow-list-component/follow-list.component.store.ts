import { IDirectiveListState, ModalType } from './follow-list.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { Form } from 'antd';
import { OrderReportService } from '~/solution/model/services/report-order.service';
import { useEffect } from 'react';
import moment from 'moment';
import { setState } from '~/framework/microAPP/appStore';

export function useDirectiveListStore() {
  const { state, setStateWrap, getState } = useStateStore(new IDirectiveListState());
  const orderReportService: OrderReportService = new OrderReportService();
  const [searchForm] = Form.useForm();

  useEffect(() => {
    initSearchForm();
  }, []);

  function getTableData(isSearch = false) {
    setStateWrap({ isLoading: true });
    const { pageIndex, pageSize, timeInfo } = getState();
    let searchData: any = {};
    if (isSearch) {
      searchData = searchForm.getFieldsValue();
      searchData.isSettle = typeof searchData.isSettle === 'number' ? !!searchData.isSettle : undefined;
      console.log(searchData);
    }
    orderReportService
      .queryReportMonitorRolePagedList({
        ...searchData,
        beginTime: timeInfo[0] ? moment(timeInfo[0]).valueOf() : 0,
        endTime: timeInfo[1] ? moment(timeInfo[1]).valueOf() : 0,
        index: pageIndex,
        size: pageSize
      })
      .subscribe(
        (res: any) => {
          setStateWrap({ tableData: res.dataList, total: res.total, isLoading: false });
        },
        err => {
          setStateWrap({ isLoading: false });
        }
      );
  }

  function searchClick() {
    setStateWrap({ pageIndex: 1 });
    getTableData(true);
  }

  function initSearchForm() {
    searchForm.resetFields();
    setStateWrap({ timeInfo: [] });
    searchClick();
  }

  function callbackAction<T>(actionType: number, data?: any) {
    setStateWrap({ currentId: data ? data.id : '' });
    switch (actionType) {
      case ModalType.RECORD:
        setStateWrap({ recordModalVisible: true });
        break;
      case ModalType.SLOVE:
        setStateWrap({ sloveModalVisible: true });
        break;
      default:
        break;
    }
  }

  function changeTablePageIndex(pageIndex: number, pageSize: number) {
    setStateWrap({ pageIndex, pageSize });
    getTableData(true);
  }

  function handleModalCancel(isSuccess = false) {
    setStateWrap({ sloveModalVisible: false, recordModalVisible: false });
    isSuccess && searchClick();
  }

  function getCurrentSelectInfo(data: any, type: string) {
    // console.log(data, type);
    if (type == 'strValue') {
      const { deviceCode = '' } = Array.isArray(data?.info?.deviceList) && data?.info?.deviceList[0];
      searchForm.setFieldsValue({ deviceCode: deviceCode });
    }
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

    if (type == 'roleId') {
      const { id } = data;
      setStateWrap({ currentRoleId: id });
      searchForm.setFieldsValue({ roleId: id });
      searchForm.resetFields(['groupId']);
    }
  }

  function handleExport(value: string) {
    const { pageIndex, pageSize, timeInfo } = getState();
    let searchData: any = {};
    searchData = searchForm.getFieldsValue();
    searchData.isSettle = typeof searchData.isSettle === 'number' ? !!searchData.isSettle : undefined;
    orderReportService
      .exportMonitorAlarmFollowList({
        ...searchData,
        beginTime: timeInfo[0] ? moment(timeInfo[0]).valueOf() : 0,
        endTime: timeInfo[1] ? moment(timeInfo[1]).valueOf() : 0,
        index: pageIndex,
        size: pageSize,
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
    setStateWrap({ exportVisible: visible });
  }

  return {
    state,
    searchForm,
    initSearchForm,
    callbackAction,
    changeTablePageIndex,
    searchClick,
    handleModalCancel,
    getCurrentSelectInfo,
    handleExport,
    handleExportVisible
  };
}
