import { IHistoryTrackState } from './history-track.interface';
import { useStateStore } from '@fch/fch-tool';
import { OrderReportService } from '~/solution/model/services/report-order.service';
import { Form } from 'antd';
import { setState } from '~/framework/microAPP/appStore';
import moment from 'moment';

export function useHistoryTrackStore() {
  const { state, setStateWrap, getState } = useStateStore(new IHistoryTrackState());
  const orderReportService: OrderReportService = new OrderReportService();
  const [searchForm] = Form.useForm();

  function getTableData() {
    const { pageIndex, pageSize, timeInfo } = getState();
    searchForm.validateFields().then(values => {
      setStateWrap({ isLoading: true });
      orderReportService
        .queryHistoryPagedList({
          deviceCode: values.deviceCode,
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
    });
  }

  function getCurrentInfo(data: any, type: string) {
    if (type == 'time') {
      setStateWrap({ timeInfo: !!data[0] ? data : [] });
    }
    if (type == 'device') {
      setStateWrap({ canExport: !!searchForm.getFieldValue('deviceCode') });
    }
  }

  function searchClick() {
    setStateWrap({ pageIndex: 1 });
    getTableData();
  }

  function initSearchForm() {
    searchForm.resetFields();
    setStateWrap({ timeInfo: [], canExport: false });
  }

  // function callbackAction<T>(actionType: number, data?: any) {
  //   setStateWrap({ currentId: data ? data.id : '' });
  //   switch (actionType) {
  //     case ModalType.CREATE:
  //       setStateWrap({});
  //       break;
  //     case ModalType.EDIT:
  //       setStateWrap({});
  //       break;
  //     default:
  //       break;
  //   }
  // }

  function changeTablePageIndex(pageIndex: number, pageSize: number) {
    setStateWrap({ pageIndex, pageSize });
    getTableData();
  }

  function handleExport(value: string) {
    const { timeInfo } = getState();
    searchForm.validateFields().then(values => {
      orderReportService
        .exportHistoryPagedList({
          deviceCode: values.deviceCode,
          beginTime: timeInfo[0] ? moment(timeInfo[0]).valueOf() : 0,
          endTime: timeInfo[1] ? moment(timeInfo[1]).valueOf() : 0,
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
    });
  }

  function handleExportVisible(visible: boolean) {
    visible && searchClick();
    setStateWrap({ exportVisible: visible });
  }
  return {
    state,
    searchForm,
    initSearchForm,
    changeTablePageIndex,
    searchClick,
    getCurrentInfo,
    handleExport,
    handleExportVisible
  };
}
