import { IAlarmConfigState } from './alarm-config.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { Form } from 'antd';
import { AlarmManageService } from '~/solution/model/services/alarm-manage.service';
import { useEffect } from 'react';

export function useAlarmConfigStore() {
  const { state, setStateWrap, getState } = useStateStore(new IAlarmConfigState());
  const alarmManageService: AlarmManageService = new AlarmManageService();
  const [searchForm] = Form.useForm();

  useEffect(() => {
    initSearchForm();
  }, []);

  function getTableData() {
    // setStateWrap({ isLoading: true })
    // const { pageIndex, pageSize } = getState()
    // alarmManageService.getAlarmConfigList({
    //   ...searchForm.getFieldsValue(),
    //   index: pageIndex,
    //   size: pageSize
    // }).subscribe(
    //   res => {
    //     setStateWrap({ tableData: res.dataList, total: res.total, isLoading: false})
    //   }, err => {
    //     setStateWrap({isLoading: false})
    //   }
    // )
  }

  function searchClick() {}

  function initSearchForm() {}

  function changeTablePageIndex() {}

  function callbackAction<T>(actionType: number, data?: T) {}

  return { state, searchForm, callbackAction, changeTablePageIndex, searchClick, initSearchForm };
}
