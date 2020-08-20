import { IEditOrderState, IEditOrderProps } from './edit-order.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { Form } from 'antd';

export function useEditOrderStore(props: IEditOrderProps) {
  const { state, setStateWrap } = useStateStore(new IEditOrderState());
  const [form] = Form.useForm();

  function selfSubmit(values: any) {
    console.log(values);
  }
  function selfClose() {
    form.resetFields();
    props.close && props.close();
  }

  return { state, form, selfSubmit, selfClose };
}
