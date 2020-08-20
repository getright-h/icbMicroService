import { IDeviceImportState, IDeviceImportProps } from './device-import.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { Form } from 'antd';

export function useDeviceImportStore(props: IDeviceImportProps) {
  const { state, setStateWrap } = useStateStore(new IDeviceImportState());
  const [form] = Form.useForm();

  function selfSubmit(values: any) {
    console.log(values);
  }
  function selfClose() {
    form.resetFields();
    props.close && props.close();
  }
  function changeImportType(value: any) {
    setStateWrap({ importType: value });
  }
  return { state, form, selfSubmit, selfClose, changeImportType };
}
