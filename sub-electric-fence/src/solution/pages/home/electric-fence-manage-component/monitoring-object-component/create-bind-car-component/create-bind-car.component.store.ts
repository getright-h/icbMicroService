import { ICreateBindCarState } from './create-bind-car.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { Form } from 'antd';

export function useCreateBindCarStore() {
  const { state, setStateWrap } = useStateStore(new ICreateBindCarState());
  const [form] = Form.useForm();
  return { state, form };
}
