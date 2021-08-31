import { IAlarmParameterState, ModalType } from './alarm-parameter.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useAuthorityState } from '~/framework/aop/hooks/use-authority-state';
import { Form, message } from 'antd';
import { AlarmManageService } from '~/solution/model/services/alarm-manage.service';
import { MutableRefObject, useEffect, useRef } from 'react';
import { AlarmParamItem, AlarmTemplateListItem } from '~/solution/model/dto/alarm-manage.dto';

export function useAlarmParameterStore() {
  const { state, setStateWrap } = useStateStore(new IAlarmParameterState());
  const alarmManageService: AlarmManageService = new AlarmManageService();
  const [searchForm] = Form.useForm();
  const { $auth } = useAuthorityState();
  const paramTemplatesRef: MutableRefObject<AlarmParamItem[]> = useRef([]);

  useEffect(() => {
    initSearchForm();
    getAlarmParamTemplates();
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

  function getAlarmParamTemplates() {
    alarmManageService.queryAlarmParamList().subscribe(res => {
      paramTemplatesRef.current = res;
    });
  }

  function initSearchForm() {
    searchForm.resetFields();
    getTableData();
  }

  function callbackAction(actionType: number, data?: AlarmTemplateListItem) {
    const template = paramTemplatesRef.current.find(item => item.type === data.code);
    setStateWrap({ currentTemplate: { id: data.id, ...template } });
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
    $auth,
    searchForm,
    initSearchForm,
    callbackAction,
    handleModalCancel,
    getTableData
  };
}
