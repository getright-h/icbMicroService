import { IDeviceImportState, IDeviceImportProps } from './device-import.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { Form } from 'antd';
import { ALLOW_FLOW_KEYCODE_ENUM, ALLOW_FLOW_ENUM } from '~shared/constant/common.const';
import { ShowNotification } from '~/framework/util/common';
import { AllocationManageService } from '~/solution/model/services/allocation-manage.service';
import { useEffect } from 'react';
import { Subscription } from 'rxjs';

export function useDeviceImportStore(props: IDeviceImportProps) {
  const { state, setStateWrap } = useStateStore(new IDeviceImportState());
  const allocationManageService: AllocationManageService = new AllocationManageService();
  const [form] = Form.useForm();
  let setAllotFlowSubscription: Subscription;

  // 不参与页面更新
  const deviceList: any = [];
  function selfSubmit() {
    const { allotId, id, state } = props.data;
    console.log(allotId, id, state);
    if (!allotId || !id) return;
    deviceList.forEach((device: any) => {
      device.key != undefined && delete device.key;
    });
    const searchForm = {
      id,
      allotId,
      operation: ALLOW_FLOW_KEYCODE_ENUM.Apply,
      deviceList
    };
    ALLOW_FLOW_ENUM.Reject === state && (searchForm.operation = ALLOW_FLOW_KEYCODE_ENUM.ReApply);
    setStateWrap({ submitLoading: true });
    allocationManageService.setAllotFlow(searchForm).subscribe(
      (res: any) => {
        console.log(res);
        ShowNotification.success('申请成功');
        setStateWrap({ submitLoading: false });
        props.getAlloactionDetail && props.getAlloactionDetail(props.data.id);
        props.getTableData && props.getTableData();
        setTimeout(() => {
          props.close && props.close();
        }, 300);
        deviceList.length = 0;
      },
      (error: any) => {
        setStateWrap({ submitLoading: false });
      }
    );
  }
  function selfClose() {
    form.resetFields();
    props.close && props.close();
  }
  function changeImportType(value: any) {
    setStateWrap({ importType: value });
  }

  /**
   * 用于处理输入的设备号
   * @param value 设备号
   * @param typeId 设备ID
   * @param key 行号
   * 以ID作为关联
   */
  function onChange(value: any, device: any, key: number) {
    console.log(device);

    const currentDevice = {
      key,
      typeId: device.typeId,
      typeName: device.typeName,
      code: value
    };
    // 如果存在Key则更新值, 不做增加处理
    const exitIndex = deviceList.findIndex((dev: any) => dev.key == key);
    if (exitIndex != -1) {
      deviceList[exitIndex].code = value;
    } else {
      // 不存在则做增加处理
      deviceList.push(currentDevice);
    }
  }
  /**
   * 用于移除设备号
   * @param device
   * @param key
   */
  function removeDevice(key: number) {
    const deleteIndex = deviceList.findIndex((dev: any) => dev.key == key);
    if (deleteIndex != -1) {
      deviceList.splice(deleteIndex, 1);
    }
  }
  useEffect(() => {
    console.log(props, 222);
    return () => {
      setAllotFlowSubscription && setAllotFlowSubscription.unsubscribe();
    };
  }, [props.data.id]);
  return { state, form, selfSubmit, selfClose, changeImportType, onChange, removeDevice };
}
