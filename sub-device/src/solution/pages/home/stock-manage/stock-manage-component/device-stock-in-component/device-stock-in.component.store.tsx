import * as React from 'react';
import { IDeviceStockInState, IDeviceStockInProps } from './device-stock-in.interface';
import { useService, useStateStore } from '~/framework/aop/hooks/use-base-store';
import { Form, Modal } from 'antd';
import { StockManageService } from '~/solution/model/services/stock-manage.service';
import { ShowNotification } from '~/framework/util/common';
import { MutableRefObject, useContext, useRef } from 'react';
import { StockListManageContext } from '../stock-manage.component';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { RadioChangeEvent } from 'antd/lib/radio';
import axios from 'axios';
import { useAuthorityState } from '~/framework/aop/hooks/use-authority-state';

export function useDeviceStockInStore(props: IDeviceStockInProps) {
  const { state, setStateWrap } = useStateStore(new IDeviceStockInState());
  const stockManageService: StockManageService = useService(StockManageService);
  const { reduxState } = useContext(StockListManageContext);
  const [form] = Form.useForm();
  const confirmFormRef: MutableRefObject<any> = useRef();
  const { $auth } = useAuthorityState();

  function getCurrentSelectInfo(typeName: string, option: Record<string, any>) {
    const { formData } = state;
    switch (typeName) {
      case 'type':
        formData.typeName = option?.info.name;
        break;
      case 'position':
        formData.storePositionName = option?.info.name;
        break;
      case 'purchase':
        formData.purchaseCode = option?.info.code;
        break;
    }
    setStateWrap({ formData });
  }

  function selfSubmit(values: any) {
    setStateWrap({ confirmLoading: true });
    confirmFormRef.current = {
      ...values,
      ...state.formData,
      storeId: reduxState.currentSelectNode.id,
      storeName: reduxState.currentSelectNode.name
    };
    if (state.importType === 2) {
      confirmFormRef.current.deviceList = [...state.deviceImportList];
    }
    if (state.isExitWrongData) {
      ShowNotification.warning('设备录入有误!');
      setStateWrap({ confirmLoading: false });
      return;
    }
    stockManageService.materialStockIn(confirmFormRef.current).subscribe(
      (res: any) => {
        if (res.errorDeviceList.length > 0) {
          setStateWrap({ errorList: res.errorDeviceList, isErrorListVisible: true });
        } else {
          ShowNotification.success('入库成功！');
          selfClose(true);
        }
        setStateWrap({ confirmLoading: false });
      },
      (err: any) => {
        setStateWrap({ confirmLoading: false });
      }
    );
  }

  function callbackAction(data: any) {
    const { errorList } = state;
    Modal.confirm({
      title: '是否确认恢复设备？',
      centered: true,
      icon: <ExclamationCircleOutlined />,
      onOk: () =>
        new Promise((resolve, reject) => {
          stockManageService
            .renewMaterial({
              deviceCode: data.code,
              storeId: confirmFormRef.current.storeId,
              storePositionId: confirmFormRef.current.storePositionId
            })
            .subscribe(
              (res: any) => {
                ShowNotification.success('已恢复！');
                resolve(true);
                errorList.map(device => {
                  if (device.code === data.code) {
                    device.isRenew = false;
                    device.isRenewed = true;
                  }
                });
                setStateWrap({ errorList });
              },
              (err: any) => {
                reject();
              }
            );
        })
    });
  }

  function selfClose(isSuccess = false) {
    form.resetFields();
    setStateWrap({ isErrorListVisible: false });
    props.close?.(isSuccess);
  }

  function changeImportType(e: RadioChangeEvent) {
    setStateWrap({ importType: e.target.value });
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
      .then(({ data: response }) => {
        item.onSuccess(response, item.file);
        const deviceImportList = resloveData(response.data);
        setStateWrap({ deviceImportList });
      });
  }

  // 对数据进行清洗
  // 对于上传的设备号，目前如果其中存在有问题的数据
  // 则只是展示问题数据，并且展示其错误原因，
  // 只有数据完全正确那么才展示所有数据进行正常提交

  function resloveData(data: []): any[] {
    if (!Array.isArray(data)) return [];
    const wrongData = data.filter((_: any) => _.remark);
    setStateWrap({
      isExitWrongData: !!wrongData.length
    });

    if (wrongData.length) {
      return wrongData;
    } else {
      return data;
    }
  }

  return {
    state,
    form,
    reduxState,
    $auth,
    selfSubmit,
    selfClose,
    getCurrentSelectInfo,
    callbackAction,
    changeImportType,
    customRequest
  };
}
