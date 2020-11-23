import { IDirectiveListState, ModalType } from './directive-list.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { Form } from 'antd';
import { AlarmManageService } from '~/solution/model/services/alarm-manage.service';
import { useEffect } from 'react';

export function useDirectiveListStore() {
  const { state, setStateWrap, getState } = useStateStore(new IDirectiveListState());
  const alarmManageService: AlarmManageService = new AlarmManageService();
  const [searchForm] = Form.useForm();

  useEffect(() => {
    initSearchForm();
  }, []);

  function getTableData() {
    // setStateWrap({ isLoading: true });
    // const { pageIndex, pageSize } = getState();
    // alarmManageService
    //   .queryOwnerPagedList({
    //     ...searchForm.getFieldsValue(),
    //     index: pageIndex,
    //     size: pageSize
    //   })
    //   .subscribe(
    //     res => {
    //       setStateWrap({ tableData: res.dataList, total: res.total, isLoading: false });
    //     },
    //     err => {
    //       setStateWrap({ isLoading: false });
    //     }
    //   );
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
      case ModalType.PATCH:
        setStateWrap({ patchModalVisible: true });
        break;
      default:
        break;
    }
  }

  function close(refresh?: boolean) {
    if (refresh) {
      getTableData();
    }
    setStateWrap({
      patchModalVisible: false
    });
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
    close
  };
}
