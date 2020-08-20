import { IDeviceEditState, IDeviceEditProps } from './device-edit.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { Form } from 'antd';

export function useDeviceEditStore(props: IDeviceEditProps) {
  const { state, setStateWrap } = useStateStore(new IDeviceEditState());
  const [form] = Form.useForm();

  function selfSubmit(values: any) {
    console.log(values);
  }
  function selfClose() {
    form.resetFields();
    setStateWrap({ isEdit: false });
    props.close && props.close();
  }
  function changeToEdit() {
    setStateWrap({ isEdit: true });
  }

  return { state, form, selfSubmit, selfClose, changeToEdit };
}
