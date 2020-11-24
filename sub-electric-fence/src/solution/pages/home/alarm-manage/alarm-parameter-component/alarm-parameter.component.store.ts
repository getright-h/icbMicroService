import { IAlarmParameterState, ModalType } from './alarm-parameter.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { Form } from 'antd';
import { AlarmManageService } from '~/solution/model/services/alarm-manage.service';
import { useEffect } from 'react';

export function useAlarmParameterStore() {
  const { state, setStateWrap, getState } = useStateStore(new IAlarmParameterState());
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
    setStateWrap({ tableData: [{ id: 'aaa', type: '碰撞报警' }] });
  }

  function searchClick() {
    setStateWrap({ pageIndex: 1 });
    getTableData();
  }

  function initSearchForm() {
    searchForm.resetFields();
    searchClick();
  }

  function callbackAction<T>(actionType: number, data?: T) {
    setStateWrap({ currentId: data ? data.id : '' });
    switch (actionType) {
      case ModalType.TEMPADD:
        setStateWrap({ tempAddVisible: true });
        break;
      case ModalType.TEMPLIST:
        setStateWrap({ tempListVisible: true });
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
    setStateWrap({ tempAddVisible: false, tempListVisible: false });
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
