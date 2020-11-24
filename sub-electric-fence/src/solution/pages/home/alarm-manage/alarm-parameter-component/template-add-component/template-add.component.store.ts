import { ITemplateAddProps, ITemplateAddState } from './template-add.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { Form } from 'antd';
import { Store } from 'antd/es/form/interface';

export function useTemplateAddStore(props: ITemplateAddProps) {
  const { state, setStateWrap } = useStateStore(new ITemplateAddState());
  const [form] = Form.useForm();

  function selfClose(isSuccess = false) {
    props?.close(isSuccess);
  }

  function selfSubmit(values: Store) {
    selfClose(true);
  }

  return { state, form, selfClose, selfSubmit };
}
