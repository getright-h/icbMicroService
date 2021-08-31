import { IBulkImportState, IBulkImportProps } from './bulk-import.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { Form } from 'antd';

export function useBulkImportStore(props: IBulkImportProps) {
  const { state, setStateWrap } = useStateStore(new IBulkImportState());
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
