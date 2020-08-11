import { IFollowUpState } from './follow-up.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { FormInstance } from 'antd/lib/form';

export function useFollowUpStore(form: FormInstance) {
  const { state, setStateWrap } = useStateStore(new IFollowUpState());
  function handleOK() {
    console.log(form.getFieldsValue());
    setStateWrap({
      visible: false
    });
  }
  return { state };
}
