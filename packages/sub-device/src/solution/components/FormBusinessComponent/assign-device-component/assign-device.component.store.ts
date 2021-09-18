import { IAssignDeviceState, IAssignDeviceStateProps } from './assign-device.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect } from 'react';
import { useForm } from 'antd/lib/form/Form';

export function useAssignDeviceStore(props: IAssignDeviceStateProps) {
  const { state, setStateWrap } = useStateStore(new IAssignDeviceState());
  const [form] = useForm();
  useEffect(() => {
    console.log(props.value);
    Array.isArray(props.value) && form.setFieldsValue({ deviceList: props.value });
    console.log(form.getFieldsValue());
  }, [props.value]);

  function handleDeviceChange(typeName: string, option: any) {
    // typeName == 'type' && setStateWrap({ editTypeName: option?.info.name });
    props.handleDeviceChange(form.getFieldsValue().deviceList);
  }

  return { state, form, handleDeviceChange };
}
