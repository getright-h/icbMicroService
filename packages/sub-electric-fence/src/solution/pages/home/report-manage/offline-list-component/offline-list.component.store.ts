import { IOfflineListState, ModalType } from './offline-list.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { Form } from 'antd';
import { useEffect } from 'react';
import { OrderReportService } from '~/solution/model/services/report-order.service';
import { setState } from '~/framework/microAPP/appStore';

export function useOfflineListStore() {
  const { state, setStateWrap, getState } = useStateStore(new IOfflineListState());
  const orderReportService: OrderReportService = new OrderReportService();
  const [searchForm] = Form.useForm();

  useEffect(() => {
    initSearchForm();
  }, []);

  function getTableData() {
    setStateWrap({ isLoading: true });
    const { pageIndex, pageSize } = getState();
    orderReportService
      .queryMonitorDeviceOfflinePagedList({
        ...searchForm.getFieldsValue(),
        index: pageIndex,
        size: pageSize
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
    searchClick();
  }

  function getCurrentSelectInfo(data: any, type: string) {
    if (type == 'organizationId') {
      const { organizationId } = data;
      searchForm.setFieldsValue({ organizationId });
    }
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

  function handleModalCancel(isSuccess = false) {
    setStateWrap({});
    isSuccess && searchClick();
  }

  function handleExport(value: string) {
    const { pageIndex, pageSize } = getState();
    orderReportService
      .queryMonitorDeviceOfflinePagedList({
        ...searchForm.getFieldsValue(),
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
