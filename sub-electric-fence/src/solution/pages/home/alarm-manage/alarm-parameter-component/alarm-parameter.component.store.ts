import { IAlarmParameterState, ModalType } from './alarm-parameter.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { Form, message } from 'antd';
import { AlarmManageService } from '~/solution/model/services/alarm-manage.service';
import { useEffect } from 'react';

export function useAlarmParameterStore() {
  const { state, setStateWrap } = useStateStore(new IAlarmParameterState());
  const alarmManageService: AlarmManageService = new AlarmManageService();
  const [searchForm] = Form.useForm();

  useEffect(() => {
    initSearchForm();
  }, []);

  function getTableData() {
    setStateWrap({ isLoading: true });
    alarmManageService.queryAlarmTemplatePagedList(searchForm.getFieldsValue()).subscribe(
      res => {
        setStateWrap({ tableData: res.dataList, total: res.total, isLoading: false });
      },
      err => {
        setStateWrap({ isLoading: false });
      }
    );
  }

  function initSearchForm() {
    searchForm.resetFields();
    getTableData();
  }

  function callbackAction<T>(actionType: number, data?: T) {
    setStateWrap({ currentTemplate: data });
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

  function handleModalCancel(isSuccess = false) {
    setStateWrap({ tempAddVisible: false, tempListVisible: false });
    isSuccess && getTableData();
  }

  return {
    state,
    searchForm,
    initSearchForm,
    callbackAction,
    handleModalCancel,
    getTableData
  };
}
