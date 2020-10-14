import { IDeviceImportState, IDeviceImportProps } from './device-import.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { Form } from 'antd';
import { useEffect } from 'react';

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

  useEffect(() => {
    console.log(props, 222);
  }, [props.data.id]);
  return { state, form, selfSubmit, selfClose, changeImportType };
}
