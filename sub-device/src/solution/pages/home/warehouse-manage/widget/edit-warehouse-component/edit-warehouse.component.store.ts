import { IEditWarehouseState, IEditWarehouseProps } from './edit-warehouse.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { Form } from 'antd';
import { useEffect } from 'react';

export function useEditWarehouseStore(props: IEditWarehouseProps) {
  const { state, setStateWrap } = useStateStore(new IEditWarehouseState());
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
