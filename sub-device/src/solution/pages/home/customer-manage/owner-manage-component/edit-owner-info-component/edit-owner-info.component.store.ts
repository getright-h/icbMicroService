import { IEditOwnerInfoState, IEditOwnerInfoProps } from './edit-owner-info.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { Form } from 'antd';

export function useEditOwnerInfoStore(props: IEditOwnerInfoProps) {
  const { state, setStateWrap } = useStateStore(new IEditOwnerInfoState());
  const [form] = Form.useForm();

  function toggleShowMore() {
    setStateWrap({ hasMore: !state.hasMore });
  }
  function selfSubmit(values: any) {
    console.log(values);
  }
  function selfClose() {
    form.resetFields();
    props.close && props.close();
  }

  return { state, form, toggleShowMore, selfSubmit, selfClose };
}
