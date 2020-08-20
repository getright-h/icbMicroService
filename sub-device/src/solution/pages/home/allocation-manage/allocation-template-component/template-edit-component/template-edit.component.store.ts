import { ITemplateEditState } from './template-edit.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { Form } from 'antd';

export function useTemplateEditStore() {
  const { state, setStateWrap } = useStateStore(new ITemplateEditState());
  const [form] = Form.useForm();
  return { state, form };
}
