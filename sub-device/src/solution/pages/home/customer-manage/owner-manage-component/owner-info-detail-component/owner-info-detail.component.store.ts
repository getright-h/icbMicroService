import { IOwnerInfoDetailState, IOwnerInfoDetailProps } from './owner-info-detail.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { Form } from 'antd';

export function useOwnerInfoDetailStore(props: IOwnerInfoDetailProps) {
  const { state, setStateWrap } = useStateStore(new IOwnerInfoDetailState());
  const [form] = Form.useForm();

  function toggleShowMore() {
    setStateWrap({ hasMore: !state.hasMore });
  }
  function selfSubmit(values: any) {
    console.log(values);
  }
  function selfClose() {
    form.resetFields();
    props?.close();
  }

  return { state, form, selfSubmit, selfClose, toggleShowMore };
}
