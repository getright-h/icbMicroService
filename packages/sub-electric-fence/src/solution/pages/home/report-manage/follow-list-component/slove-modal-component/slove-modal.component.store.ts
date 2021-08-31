import { IDirectiveModalState, ModalType, IDirectiveModalProps } from './slove-modal.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { Form } from 'antd';
import { AlarmManageService } from '~/solution/model/services/alarm-manage.service';
import { useEffect } from 'react';
import { values } from 'lodash';
import { from } from 'rxjs';
import { PropTypes } from 'mobx-react';

export function useDirectiveModalStore(props: IDirectiveModalProps) {
  const { state, setStateWrap, getState } = useStateStore(new IDirectiveModalState());
  const alarmManageService: AlarmManageService = new AlarmManageService();
  const [form] = Form.useForm();

  useEffect(() => {}, []);

  function getTableData() {
    // setStateWrap({ isLoading: true });
    // const { pageIndex, pageSize } = getState();
    // alarmManageService
    //   .queryOwnerPagedList({
    //     ...form.getFieldsValue(),
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

  function submitForm() {
    form.validateFields().then((values: any) => {
      console.log(values);
    });
    searchClick();
  }

  function sloveState() {
    form.validateFields().then((value: any) => {
      const { device } = value;
      setStateWrap({
        isDevice: !!device
      });
    });
  }
  function callbackAction<T>(actionType: number, data?: T) {
    switch (actionType) {
      case ModalType.CUSTOM:
        const { custom } = state;
        setStateWrap({
          custom: !custom
        });
        break;
      case ModalType.FORM:
        sloveState();
        break;
      default:
        break;
    }
  }
  function selfClose() {
    form.resetFields();
    props.close && props.close();
  }

  return {
    state,
    form,
    submitForm,
    callbackAction,
    selfClose
  };
}
