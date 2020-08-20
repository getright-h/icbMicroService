import { IDeviceStockInState, IDeviceStockInProps } from './device-stock-in.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { Form } from 'antd';

export function useDeviceStockInStore(props: IDeviceStockInProps) {
  const { state, setStateWrap } = useStateStore(new IDeviceStockInState());
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
