import { IAddShippingSpaceState } from './add-shipping-space.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { WarehouseListManageContext } from '../warehouse-list.component';
import { setModalvisible } from '../warehouse-list-redux/warehouse-list-action';
import { Form } from 'antd';
import { useEffect } from 'react';

export function useAddShippingSpaceStore() {
  const { state, setStateWrap } = useStateStore(new IAddShippingSpaceState());
  const { dispatch } = React.useContext(WarehouseListManageContext);
  const [form] = Form.useForm();
  function handleOk() {}

  function handleCancel() {
    setModalvisible({ modal: 'addShippingSpaceVisible', value: false }, dispatch);
  }
  return { state, handleOk, handleCancel, form };
}
