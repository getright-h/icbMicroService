import { IDirectiveListState, ModalType } from './monitor-list.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { Form } from 'antd';
import { OrderReportService } from '~/solution/model/services/report-order.service';
import { useEffect } from 'react';
import { IMAP } from '~shared/util/map.util';

export function useDirectiveListStore() {
  const { state, setStateWrap, getState } = useStateStore(new IDirectiveListState());
  const orderReportService: OrderReportService = new OrderReportService();
  const [searchForm] = Form.useForm();

  useEffect(() => {
    initSearchForm();
  }, []);

  function getTableData() {
    setStateWrap({ isLoading: true });
    const { pageIndex, pageSize } = getState();
    orderReportService
      .queryResidentPagedList({
        ...searchForm.getFieldsValue(),
        index: pageIndex,
        size: pageSize
      })
      .subscribe(
        (res: any) => {
          const { dataList = [] } = res;
          const fetchArrary: any[] = [];
          if (Array.isArray(dataList)) {
            for (let i = 0; i < dataList.length; i++) {
              const { latitude, longitude } = dataList[i];
              if (latitude && longitude) {
                fetchArrary.push(IMAP.covertPointToAddress([longitude, latitude]));
              }
            }
          }
          Promise.all(fetchArrary).then((res: any) => {
            try {
              for (let i = 0; i < res.length; i++) {
                dataList[i].address = res[i];
              }
            } catch (error) {
              console.log(error);
            }
            setStateWrap({ tableData: dataList, total: res.total, isLoading: false });
          });
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
    handleModalCancel
  };
}
