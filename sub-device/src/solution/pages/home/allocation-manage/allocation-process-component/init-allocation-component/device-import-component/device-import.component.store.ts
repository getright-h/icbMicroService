import { IDeviceImportState, IDeviceImportProps } from './device-import.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { Form } from 'antd';
import { ALLOW_FLOW_KEYCODE_ENUM, ALLOW_FLOW_ENUM } from '~shared/constant/common.const';
import { ShowNotification } from '~/framework/util/common';
import { AllocationManageService } from '~/solution/model/services/allocation-manage.service';
import { useEffect, MutableRefObject, useRef } from 'react';
import { Subscription } from 'rxjs';
import axios from 'axios';

export function useDeviceImportStore(props: IDeviceImportProps) {
  const { state, setStateWrap } = useStateStore(new IDeviceImportState());
  const returnFileListInfo: MutableRefObject<Array<string>> = useRef([]);
  const allocationManageService: AllocationManageService = new AllocationManageService();
  const [form] = Form.useForm();
  let setAllotFlowSubscription: Subscription;

  // 不参与页面更新, 用户获取当前输入的设备号
  // 后期优化 使用from 获取，干净又卫生
  //  onChange removeDevice 可以移除
  const deviceList: any = [];

  function selfSubmit() {
    // isMove 流转操作
    const { isMove, data = {} } = props;
    const { allotId, id } = data;
    const { checkResult } = state;
    const { errorTotal = 0, message = '', successList = [] } = checkResult;
    // 如果 有错误提示 message 不成功
    // 如果 errorTotal  不成功
    if (message || errorTotal || !successList.length) {
      ShowNotification.warning('设备号有误!');
      return;
    }
    if (!allotId || !id) return;
    const searchForm = {
      id,
      allotId,
      operation: ALLOW_FLOW_KEYCODE_ENUM.Apply,
      deviceList: successList
    };

    [ALLOW_FLOW_ENUM.Recall, ALLOW_FLOW_ENUM.Reject, ALLOW_FLOW_ENUM.Return].includes(data?.state) &&
      (searchForm.operation = ALLOW_FLOW_KEYCODE_ENUM.ReApply);
    isMove && (searchForm.operation = ALLOW_FLOW_KEYCODE_ENUM.Move);
    setStateWrap({ submitLoading: true });
    allocationManageService.setAllotFlow(searchForm).subscribe(
      (res: any) => {
        const { isSuccess } = res;
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

  // TODO 上传excel文件
  function customRequest(item: any) {
    const data = new FormData();
    data.append('file', item.file);
    return axios
      .post(item.action, data, {
        onUploadProgress: ({ total, loaded }) => {
          item.onProgress({ percent: Number(Math.round((loaded / total) * 100).toFixed(2)) }, item.file);
        }
      })
      .then(({ data: response }) => {
        item.onSuccess(response, item.file);
        returnFileListInfo.current = response.data;
      });
  }

  function checkAllotDeviceInfo(e: any) {
    const { importType } = state;
    const { allotId, deviceTypeList, storePositionId } = props.data;

    // TODO 获取Form.List 内部值
    const device_map: any = {};
    deviceTypeList.forEach((device: any) => {
      const _curdeviceList = form.getFieldValue(`device_${device.typeId}`);
      device_map[device.typeId] = [..._curdeviceList.map((item: any) => item.number)];
    });

    // 根据 device_map 构造出需要检查的数据
    const paramsDevicelist: any[] = [];
    deviceTypeList.forEach((device: any) => {
      if (device_map[device.typeId] && device_map[device.typeId].length) {
        device_map[device.typeId].forEach((code: any) => {
          paramsDevicelist.push({
            typeId: device.typeId,
            typeName: device.typeName,
            code: code
          });
        });
      }
    });

    const params: any = { allotId, list: [], storePositionId };
    if (importType == 1) {
      params.list = returnFileListInfo.current;
    } else {
      params.list = paramsDevicelist;
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
   *
   */
  function onChange(value: any, device: any, index: number) {
    const currentDevice = {
      key: index + '-' + device.typeName,
      typeId: device.typeId,
      typeName: device.typeName,
      code: value
    };

    // 如果存在Key + typeName 则更新值, 不做增加处理
    const exitIndex = deviceList.findIndex((dev: any) => dev.key == index + '-' + device.typeName);
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
  function removeDevice(device: any, index: number) {
    const deleteIndex = deviceList.findIndex((dev: any) => dev.key == index + '-' + device.typeName);
    if (deleteIndex != -1) {
      deviceList.splice(deleteIndex, 1);
    }
  }

  function changeTablePageIndex(index: any, size: any) {
    setStateWrap({ currentIndex: index });
  }
  useEffect(() => {
    return () => {
      setAllotFlowSubscription && setAllotFlowSubscription.unsubscribe();
    };
  }, []);
  return {
    state,
    form,
    selfSubmit,
    selfClose,
    changeImportType,
    onChange,
    removeDevice,
    checkAllotDeviceInfo,
    customRequest,
    changeTablePageIndex
  };
}
