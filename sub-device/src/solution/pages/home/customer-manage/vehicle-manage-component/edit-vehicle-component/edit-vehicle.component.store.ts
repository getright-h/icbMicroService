import { IEditVehicleState } from './edit-vehicle.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Form } from 'antd';
import { CustomerManageService } from '~/solution/model/services/customer-manage.service';

export function useEditVehicleStore() {
  const { state, setStateWrap } = useStateStore(new IEditVehicleState());
  const customerManageService: CustomerManageService = new CustomerManageService();
  const params = useParams();
  const history = useHistory();
  const [form] = Form.useForm();

  useEffect(() => {
    params.hasOwnProperty('id') && setStateWrap({ id: params['id'], isEdit: true });
  }, []);

  function createUserTypeChange(value: number) {
    setStateWrap({ createUserType: value });
  }

  function handleSubmit(values: any) {
    console.log(values);
  }

  function cancelSubmit() {
    history.push('/home/customer/vehicle');
  }

  return { state, form, createUserTypeChange, handleSubmit, cancelSubmit };
}
