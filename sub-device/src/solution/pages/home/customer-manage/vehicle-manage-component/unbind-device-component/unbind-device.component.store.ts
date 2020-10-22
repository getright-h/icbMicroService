import { IUnbindDeviceState, IUnbindDeviceProps } from './unbind-device.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { Form } from 'antd';

export function useUnbindDeviceStore(props: IUnbindDeviceProps) {
  const { state, setStateWrap } = useStateStore(new IUnbindDeviceState());
  const [form] = Form.useForm();

  function selfSubmit(values: any) {
    console.log(values);
  }

  function selfClose() {
    form.resetFields();
    props?.close();
    setStateWrap({ unbindType: 0 });
  }

  function changeModal() {
    setStateWrap({ unbindType: 1 });
  }

  function deviceUnbind() {}

  return { state, form, selfSubmit, selfClose, changeModal, deviceUnbind };
}
