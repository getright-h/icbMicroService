import { IAddDeviceTypeState, IAddDeviceType } from './add-device-type.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { ShowNotification } from '~/framework/util/common';
import { DeviceTypeService } from '~/solution/model/services/device-type.service';
import { useEffect } from 'react';
import { Subscription } from 'rxjs';
import { Form } from 'antd';
export function useAddDeviceTypeStore(props: IAddDeviceType) {
  const { state, setStateWrap } = useStateStore(new IAddDeviceTypeState());
  const deviceTypeService: DeviceTypeService = new DeviceTypeService();
  const [form] = Form.useForm();
  let insetDeviceTypeSubscription: Subscription;
  let updateDeviceTypeSubscription: Subscription;
  function onSubmit() {
    setStateWrap({ submitLoading: true });
    form
      .validateFields()
      .then(value => {
        console.log(value, 22);
        addDeviceType();
      })
      .catch(() => {
        setStateWrap({ submitLoading: false });
      });
  }

  function addDeviceType() {
    const { searchForm, imageList } = state;
    searchForm.supplierId = 'a8bfea91c100cb39449c08d85bebb643';
    insetDeviceTypeSubscription = deviceTypeService.insetDeviceType(searchForm).subscribe(
      (res: any) => {
        props.fetchData && props.fetchData();
        props.close && props.close();
        ShowNotification.success('添加成功!');
        form.resetFields();

        setStateWrap({ submitLoading: false });
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  function alertDeviceType() {
    const { searchForm, imageList } = state;
    searchForm.id = props.data.id;
    searchForm.supplierId = 'a8bfea91c100cb39449c08d85bebb643';
    updateDeviceTypeSubscription = deviceTypeService.updateDeviceType(searchForm).subscribe(
      (res: any) => {
        props.fetchData && props.fetchData();
        props.close && props.close();
        ShowNotification.success('修改成功!');
        form.resetFields();
        setStateWrap({ submitLoading: false });
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  function onChange(value: any, valueType: string) {
    const { searchForm } = state;
    setStateWrap({
      searchForm: {
        ...searchForm,
        [valueType]: value
      }
    });
  }
  useEffect(() => {
    form.resetFields();
    setStateWrap({
      searchForm: props.data || {}
    });
    form.setFieldsValue(props.data);
    return () => {
      insetDeviceTypeSubscription && insetDeviceTypeSubscription.unsubscribe();
      updateDeviceTypeSubscription && updateDeviceTypeSubscription.unsubscribe();
    };
  }, [JSON.stringify(props.data)]);
  return { state, form, onChange, onSubmit, alertDeviceType };
}
