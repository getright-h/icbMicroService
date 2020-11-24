import { ITemplateListProps, ITemplateListState } from './template-list.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { Form } from 'antd';
import { Store } from 'antd/es/form/interface';

export function useTemplateListStore(props: ITemplateListProps) {
  const { state, setStateWrap } = useStateStore(new ITemplateListState());

  const [form] = Form.useForm();

  function selfClose(isSuccess = false) {
    props?.close(isSuccess);
  }

  function selfSubmit(values: Store) {
    selfClose(true);
  }

  return { state, form, selfClose, selfSubmit };
}
