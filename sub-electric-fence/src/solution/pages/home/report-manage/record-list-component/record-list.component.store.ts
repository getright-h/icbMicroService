import { IDwellListState, ModalType } from './redord-list.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { Form } from 'antd';
import { OrderReportService } from '~/solution/model/services/report-order.service';
import { useEffect } from 'react';
import { IMAP } from '~shared/util/map.util';
import { times } from 'lodash';

export function useDwellListStore() {
  const { state, setStateWrap, getState } = useStateStore(new IDwellListState());
  const orderReportService: OrderReportService = new OrderReportService();
  const [searchForm] = Form.useForm();

  useEffect(() => {
    initSearchForm();
  }, []);

  function getTableData() {
    setStateWrap({ isLoading: true });
    const { pageIndex, pageSize } = getState();
    orderReportService
      .queryAlarmOriginalPagedList({
        ...searchForm.getFieldsValue(),
        index: pageIndex,
        size: pageSize
      })
      .subscribe(
        async (res: any) => {
          const newData: any[] = [];
          if (Array.isArray(res.dataList)) {
            for (let i = 0; i < res.dataList.length; i++) {
              const { latitude, longitude } = res.dataList[i];
              if (latitude && longitude) {
                res.dataList[i].address = await IMAP.covertPointToAddress([longitude, latitude]);
              }
              newData.push(res.dataList[i]);
            }
          }
          setStateWrap({ tableData: newData, total: res.total, isLoading: false });
        },
        (err: any) => {
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
    console.log(data, type);
    if (type == 'strValue') {
      const { deviceCode = '' } = Array.isArray(data?.info?.deviceList) && data?.info?.deviceList[0];
      searchForm.setFieldsValue({ deviceCode: deviceCode });
    }
    if (type == 'time') {
      let beginTime, endTime;
      data[0] ? (beginTime = Date.parse(data[0])) : (beginTime = 0);
      data[1] ? (endTime = Date.parse(data[1])) : (endTime = 0);
      searchForm.setFieldsValue({ beginTime: beginTime });
      searchForm.setFieldsValue({ endTime: endTime });
    }

    if (type == 'organizationId') {
      const { organizationId } = data;
      searchForm.setFieldsValue({ organizationId: organizationId });
    }
  }
  function callbackAction<T>(actionType: number, data?: any) {
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

  return {
    state,
    searchForm,
    initSearchForm,
    callbackAction,
    changeTablePageIndex,
    searchClick,
    handleModalCancel,
    getCurrentSelectInfo
  };
}
