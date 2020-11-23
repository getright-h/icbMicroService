import { IDeviceImportState, IDeviceImportProps } from './device-import.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { Form } from 'antd';
import { ALLOW_FLOW_KEYCODE_ENUM, ALLOW_FLOW_ENUM } from '~shared/constant/common.const';
import { ShowNotification } from '~/framework/util/common';
import { AllocationManageService } from '~/solution/model/services/allocation-manage.service';
import { useEffect } from 'react';
import { Subscription } from 'rxjs';
import axios from 'axios';

export function useDeviceImportStore(props: IDeviceImportProps) {
  const { state, setStateWrap } = useStateStore(new IDeviceImportState());
  const allocationManageService: AllocationManageService = new AllocationManageService();
  const [form] = Form.useForm();
  let setAllotFlowSubscription: Subscription;

  // 不参与页面更新
  const deviceList: any = [];
  function selfSubmit() {
    // isMove 流转操作
    const { isMove, data = {} } = props;
    const { allotId, id } = data;
    const { checkResult } = state;
    const { errorTotal = 0, message = '', successList = [] } = checkResult;
    if ((message && errorTotal) || !Object.keys(checkResult).length) {
      ShowNotification.warning('设备号有误!');
      return;
    }
    if (!allotId || !id) return;
    // deviceList.forEach((device: any) => {
    //   device.key != undefined && delete device.key;
    // });
    const searchForm = {
      id,
      allotId,
      operation: ALLOW_FLOW_KEYCODE_ENUM.Apply,
      deviceList: successList
    };
    ALLOW_FLOW_ENUM.Reject === data?.state && (searchForm.operation = ALLOW_FLOW_KEYCODE_ENUM.ReApply);
    isMove && (searchForm.operation = ALLOW_FLOW_KEYCODE_ENUM.Move);
    console.log(searchForm);

    setStateWrap({ submitLoading: true });
    allocationManageService.setAllotFlow(searchForm).subscribe(
      (res: any) => {
        const { isSuccess, isMove } = res;
        isSuccess && ShowNotification.success('申请成功!');
        !isSuccess && ShowNotification.warning('申请失败!');
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

  function customRequest(item: any) {
    const data = new FormData();
    data.append('file', item.file);
    return axios
      .post(item.action, data, {
        onUploadProgress: ({ total, loaded }) => {
          item.onProgress({ percent: Number(Math.round((loaded / total) * 100).toFixed(2)) }, item.file);
        }
      })
      .then(res => {
        const { data } = res;
        setStateWrap({
          fileList: data.data || []
        });
      });
  }

  function checkAllotDeviceInfo(e: any) {
    const { fileList, importType } = state;
    const { allotId } = props.data;
    const params: any = { allotId, list: [] };
    if (importType == 1) {
      params.list = fileList;
    } else {
      params.list = deviceList;
    }
    if (!params.list.length) {
      ShowNotification.warning('请录入设备号!');
      return;
    }
    allocationManageService.checkAllotDeviceInfo(params).subscribe((res: any) => {
      setStateWrap({ checkResult: res });
    });
  }
  function selfClose() {
    form.resetFields();
    props.close && props.close();
  }
  function changeImportType(value: any) {
    // 当在切换的时候数据清除
    setStateWrap({ importType: value, checkResult: {} });
  }

  /**
   * 用于处理输入的设备号
   * @param value 设备号
   * @param typeId 设备ID
   * @param key 行号
   * 以ID作为关联
   */
  function onChange(value: any, device: any, key: number) {
    const currentDevice = {
      key,
      typeId: device.typeId,
      typeName: device.typeName,
      code: value
    };
    console.log(currentDevice);
    // 如果存在Key则更新值, 不做增加处理
    const exitIndex = deviceList.findIndex((dev: any) => dev.key == key);
    if (exitIndex != -1) {
      deviceList[exitIndex].code = value;
    } else {
      // 不存在则做增加处理
      deviceList.push(currentDevice);
    }
    console.log(deviceList);
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
  return {
    state,
    form,
    selfSubmit,
    selfClose,
    changeImportType,
    onChange,
    removeDevice,
    checkAllotDeviceInfo,
    customRequest
  };
}
