import { IUnbindDeviceState, IUnbindDeviceProps } from './unbind-device.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { Form } from 'antd';
import { CustomerManageService } from '~/solution/model/services/customer-manage.service';
import { ShowNotification } from '~/framework/util/common';

export function useUnbindDeviceStore(props: IUnbindDeviceProps) {
  const { state, setStateWrap } = useStateStore(new IUnbindDeviceState());
  const customerManageService: CustomerManageService = new CustomerManageService();
  const [form] = Form.useForm();

  function getSelectStore(value: string) {
    setStateWrap({ selectStoreId: value });
    form.setFieldsValue({ storeId: value });
  }

  function selfSubmit(values: any) {
    setStateWrap({ confirmLoading: true });
    customerManageService.deviceUnbindToStore({ ...values, ...props.info }).subscribe(
      res => {
        setStateWrap({ confirmLoading: false });
        ShowNotification.success('解绑入库成功！');
        selfClose(true);
      },
      err => {
        setStateWrap({ confirmLoading: false });
      }
    );
  }

  function selfClose(isSuccess = false) {
    form.resetFields();
    props?.close(isSuccess);
    setStateWrap({ unbindType: 0 });
  }

  function changeModal() {
    setStateWrap({ unbindType: 1 });
  }

  function deviceUnbind() {
    setStateWrap({ confirmLoading: true });
    customerManageService.deviceUnbind(props.info).subscribe(
      res => {
        setStateWrap({ confirmLoading: false });
        ShowNotification.success('解绑成功！');
        selfClose(true);
      },
      err => {
        setStateWrap({ confirmLoading: false });
      }
    );
  }

  return { state, form, selfSubmit, selfClose, changeModal, deviceUnbind, getSelectStore };
}
