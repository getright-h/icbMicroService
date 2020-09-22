import { IAddWarehouseState } from './add-warehouse.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useRef, useContext } from 'react';
import { Form } from 'antd';
import { WarehouseListManageContext } from '../warehouse-list.component';
import { setModalvisible } from '../warehouse-list-redux/warehouse-list-action';

export function useAddWarehouseStore() {
  const { state, setStateWrap } = useStateStore(new IAddWarehouseState());
  const { dispatch } = useContext(WarehouseListManageContext);
  const [form] = Form.useForm();
  function handleOk() {}
  function handleCancel() {
    setModalvisible({ modal: 'addWarehousevisible', value: false }, dispatch);
  }
  function getCurrentSelectInfo() {}
  return { state, handleCancel, handleOk, form, getCurrentSelectInfo };
}
