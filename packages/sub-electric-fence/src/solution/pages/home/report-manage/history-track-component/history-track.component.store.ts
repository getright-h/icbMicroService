import { IHistoryTrackState } from './history-track.interface';
import { useStateStore } from '@fch/fch-tool';
import { OrderReportService } from '~/solution/model/services/report-order.service';
import { useEffect } from 'react';
import { Form } from 'antd';
import { setState } from '~/framework/microAPP/appStore';

export function useHistoryTrackStore() {
  const { state, setStateWrap, getState } = useStateStore(new IHistoryTrackState());
  const orderReportService: OrderReportService = new OrderReportService();
  const [searchForm] = Form.useForm();

  function getTableData() {
    // setStateWrap({ isLoading: true });
    const { pageIndex, pageSize } = getState();
    searchForm.validateFields().then(values => {
      console.log('values===>', values);
    });
    // orderReportService
    //   .queryMonitorAlarmGroupPagedList({
    //     ...searchForm.getFieldsValue(),
    //     index: pageIndex,
    //     size: pageSize
    //   })
    //   .subscribe(
    //     (res: any) => {
    //       setStateWrap({ tableData: res.dataList, total: res.total, isLoading: false });
    //     },
    //     (err: any) => {
    //       setStateWrap({ isLoading: false });
    //     }
    //   );
  }

  function getCurrentSelectInfo(data: any, type: string) {
    // console.log(data, type);
    // if (type == 'strValue') {
    //   const { deviceCode = '' } = Array.isArray(data?.info?.deviceList) && data?.info?.deviceList[0];
    //   searchForm.setFieldsValue({ deviceCode: deviceCode });
    // }
    // if (type == 'organizationId') {
    //   const { organizationId } = data;
    //   searchForm.setFieldsValue({ organizationId: organizationId });
    // }
    // if (type == 'groupId') {
    //   const { id } = data;
    //   searchForm.setFieldsValue({ groupId: id });
    //   setStateWrap({ canExport: !!id });
    // }
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
    const { pageIndex, pageSize } = getState();
    // orderReportService
    //   .exportMonitorAlarmGroupList({
    //     ...searchForm.getFieldsValue(),
    //     index: pageIndex,
    //     size: pageSize,
    //     name: value
    //   })
    //   .subscribe(
    //     res => {
    //       setState({ showTaskCenter: true });
    //       handleExportVisible(false);
    //     },
    //     err => {
    //       handleExportVisible(false);
    //     }
    //   );
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
    getCurrentSelectInfo,
    handleExport,
    handleExportVisible
  };
}
