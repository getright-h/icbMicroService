import { IDirectiveListState, ModalType } from './statistical-list.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useAuthorityState } from '~/framework/aop/hooks/use-authority-state';
import { Form } from 'antd';
import { OrderReportService } from '~/solution/model/services/report-order.service';
import { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { GlobalContext } from '~/solution/context/global/global.provider';
import { useLocation } from 'react-router-dom';
import { IGlobalState } from '~/solution/context/global/global.interface';

import moment from 'moment';

export function useDirectiveListStore() {
  const { state, setStateWrap, getState } = useStateStore(new IDirectiveListState());
  const orderReportService: OrderReportService = new OrderReportService();
  const [searchForm] = Form.useForm();
  const history = useHistory();
  const { gState }: IGlobalState = React.useContext(GlobalContext);

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

  function callbackAction<T>(actionType: number, data: any) {
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
    // console.log(data, type);
    if (type == 'strValue') {
      const { deviceCode = '' } = Array.isArray(data?.info?.deviceList) && data?.info?.deviceList[0];
      searchForm.setFieldsValue({ deviceCode: deviceCode });
    }
    if (type == 'time') {
      // let beginTime, endTime;
      // data[0] ? (beginTime = Date.parse(data[0])) : (beginTime = 0);
      // data[1] ? (endTime = Date.parse(data[1])) : (endTime = 0);
      // searchForm.setFieldsValue({ beginTime, endTime });
      setStateWrap({ timeInfo: data });
    }

    if (type == 'organizationId') {
      const { organizationId } = data;
      searchForm.setFieldsValue({ organizationId: organizationId });
    }
  }

  function exportClick() {
    const { pageIndex, pageSize, timeInfo } = getState();
    orderReportService
      .exportMonitorAlarmStatisticsList({
        ...searchForm.getFieldsValue(),
        beginTime: timeInfo[0] ? moment(timeInfo[0]).valueOf() : 0,
        endTime: timeInfo[1] ? moment(timeInfo[1]).valueOf() : 0,
        index: pageIndex,
        size: pageSize
      })
      .subscribe(res => {
        console.log('monitor_group_export===>', res);
      });
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
    exportClick
  };
}
