import { IAddDeviceTypeState, IAddDeviceType } from './add-device-type.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { ShowNotification } from '~/framework/util/common';
import { DeviceTypeService } from '~/solution/model/services/device-type.service';
import { useEffect } from 'react';
import { Subscription } from 'rxjs';
import { Form } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
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
        const submitForm = {
          ...value,
          image: value.image && value.image.toString()
        };
        if (props.data.id) {
          alertDeviceType({ ...submitForm, id: props.data.id });
        } else {
          addDeviceType(submitForm);
        }
      })
      .catch(() => {
        setStateWrap({ submitLoading: false });
      });
  }

  function addDeviceType(submitForm: any) {
    insetDeviceTypeSubscription = deviceTypeService.insetDeviceType(submitForm).subscribe(
      (res: any) => {
        props.fetchData && props.fetchData();
        props.close && props.close();
        ShowNotification.success('添加成功!');
        form.resetFields();
        setStateWrap({ submitLoading: false });
      },
      (error: any) => {
        console.log(error);
        setStateWrap({ submitLoading: false });
      }
    );
  }

  function alertDeviceType(submitForm: any) {
    updateDeviceTypeSubscription = deviceTypeService.updateDeviceType(submitForm).subscribe(
      (res: any) => {
        props.fetchData && props.fetchData();
        props.close && props.close();
        ShowNotification.success('修改成功!');
        form.resetFields();
        setStateWrap({ submitLoading: false });
      },
      (error: any) => {
        setStateWrap({ submitLoading: false });
      }
    );
  }

  function getTypesList() {
    deviceTypeService.getTypesList().subscribe(
      (res: any) => {
        setStateWrap({ typeList: res.data, isCheckAllTypes: props?.data?.cmdIds.length == res.data.length });
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  function checkAllTypes(e: CheckboxChangeEvent) {
    if (e.target.checked) {
      const arr = state.typeList.map(o => o.cmdCode);
      form.setFieldsValue({ cmdIds: arr });
      setStateWrap({ isCheckAllTypes: true });
    } else {
      form.setFieldsValue({ cmdIds: undefined });
      setStateWrap({ isCheckAllTypes: false });
    }
  }

  function handleTypesSelect(value: string[]) {
    setStateWrap({ isCheckAllTypes: value.length == state.typeList.length });
  }

  useEffect(() => {
    form.resetFields();
    getTypesList();
    setStateWrap({
      searchForm: props.data || {},
      imageList: props.data.image || []
    });
    form.setFieldsValue(props.data);
    return () => {
      insetDeviceTypeSubscription && insetDeviceTypeSubscription.unsubscribe();
      updateDeviceTypeSubscription && updateDeviceTypeSubscription.unsubscribe();
    };
  }, []);
  return { state, form, onSubmit, alertDeviceType, checkAllTypes, handleTypesSelect };
}
