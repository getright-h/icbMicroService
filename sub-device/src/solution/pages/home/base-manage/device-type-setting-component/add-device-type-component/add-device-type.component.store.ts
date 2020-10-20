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
    const { searchForm, imageList } = state;
    searchForm.image = imageList.toString();
    setStateWrap({ submitLoading: true });
    deviceTypeService.insetDeviceType(searchForm).subscribe(
      (res: any) => {
        console.log(res);
      },
      (error: any) => {
        console.log(error);
      }
    );
    setStateWrap({ submitLoading: false });
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
