import { IStatisticalListState, ModalType } from './statistical-list.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { Form } from 'antd';
import { OrderReportService } from '~/solution/model/services/report-order.service';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import moment from 'moment';
import { setState } from '~/framework/microAPP/appStore';

export function useStatisticalListStore() {
  const { state, setStateWrap, getState } = useStateStore(new IStatisticalListState());
  const orderReportService: OrderReportService = new OrderReportService();
  const [searchForm] = Form.useForm();
  const history = useHistory();

  useEffect(() => {
    initSearchForm();
  }, []);

  function getTableData() {
    setStateWrap({ isLoading: true });
    const { pageIndex, pageSize, timeInfo } = getState();
    orderReportService
      .queryReportAlarmStatistics({
        ...searchForm.getFieldsValue(),
        beginTime: timeInfo[0] ? moment(timeInfo[0]).valueOf() : 0,
        endTime: timeInfo[1] ? moment(timeInfo[1]).valueOf() : 0,
        index: pageIndex,
        size: pageSize
      })
      .subscribe(
        (res: any) => {
          setStateWrap({ tableData: res.dataList, total: res.total, isLoading: false });
        },
        () => {
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

  function callbackAction(actionType: number, data: any) {
    setStateWrap({ currentId: data ? data.id : '' });
    switch (actionType) {
      case ModalType.LOOK:
        history.push(`statistical/detail/${data.deviceCode}/${data.alarmType}`);
        break;
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

  function handleModalCancel(isSuccess = false) {
    setStateWrap({});
    isSuccess && searchClick();
  }

  function getCurrentSelectInfo(data: any, type: string) {
    if (type == 'strValue') {
      const { deviceCode = '' } = Array.isArray(data?.info?.deviceList) && data?.info?.deviceList[0];
      searchForm.setFieldsValue({ deviceCode: deviceCode });
    }
    if (type == 'time') {
      setStateWrap({ timeInfo: !!data[0] ? data : [] });
    }

    if (type == 'organizationId') {
      const { organizationId } = data;
      searchForm.setFieldsValue({ organizationId: organizationId });
    }
  }

  function handleExport(value: string) {
    const { pageIndex, pageSize, timeInfo } = getState();
    orderReportService
      .exportMonitorAlarmStatisticsList({
        ...searchForm.getFieldsValue(),
        beginTime: timeInfo[0] ? moment(timeInfo[0]).valueOf() : 0,
        endTime: timeInfo[1] ? moment(timeInfo[1]).valueOf() : 0,
        index: pageIndex,
        size: pageSize,
        name: value
      })
      .subscribe(
        () => {
          setState({ showTaskCenter: true });
          handleExportVisible(false);
        },
        () => {
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
    handleModalCancel,
    getCurrentSelectInfo,
    handleExport,
    handleExportVisible
  };
}
