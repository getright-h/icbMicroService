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
    searchForm.image = imageList.toString();

    deviceTypeService.insetDeviceType(searchForm).subscribe(
      (res: any) => {
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
  useEffect(() => {}, [props.data?.id]);
  return { state, form, onChange, onSubmit };
}
