import { IEditStorageBinState, IEditStorageBinProps } from './edit-storage-bin.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { Form } from 'antd';

export function useEditStorageBinStore(props: IEditStorageBinProps) {
  const { state, setStateWrap } = useStateStore(new IEditStorageBinState());
  const [form] = Form.useForm();

  function setAreaInfo(value: any) {
    console.log(value);
  }
  function selfSubmit(values: any) {
    console.log(values);
  }
  function selfClose() {
    form.resetFields();
    props.close && props.close();
  }
  return { state, form, selfSubmit, selfClose, setAreaInfo };
}
