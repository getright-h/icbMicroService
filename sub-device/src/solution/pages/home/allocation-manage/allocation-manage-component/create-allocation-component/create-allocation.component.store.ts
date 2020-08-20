import { ICreateAllocationState } from './create-allocation.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { Form } from 'antd';

export function useCreateAllocationStore() {
  const { state, setStateWrap } = useStateStore(new ICreateAllocationState());
  const [form] = Form.useForm();
  return { state, form };
}
