import { IRollbackApplyState, IRollbackApplyProps } from './rollback-apply.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { Form } from 'antd';

export function useRollbackApplyStore(props: IRollbackApplyProps) {
  const { state, setStateWrap } = useStateStore(new IRollbackApplyState());
  const [form] = Form.useForm();

  function selfSubmit(values: any) {
    console.log(values);
  }
  function selfClose() {
    form.resetFields();
    props.close && props.close();
  }
  function opinionSelect(value: number) {
    setStateWrap({ opinion: value });
  }

  return { state, form, selfSubmit, selfClose, opinionSelect };
}
