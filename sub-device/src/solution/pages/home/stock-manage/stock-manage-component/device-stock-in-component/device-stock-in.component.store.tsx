import React from 'react';
import { IDeviceStockInState, IDeviceStockInProps } from './device-stock-in.interface';
import { useService, useStateStore } from '~/framework/aop/hooks/use-base-store';
import { Form, Modal } from 'antd';
import { StockManageService } from '~/solution/model/services/stock-manage.service';
import { ShowNotification } from '~/framework/util/common';
import { MutableRefObject, useContext, useRef } from 'react';
import { StockListManageContext } from '../stock-manage.component';
import { ExclamationCircleOutlined } from '@ant-design/icons';

export function useDeviceStockInStore(props: IDeviceStockInProps) {
  const { state, setStateWrap } = useStateStore(new IDeviceStockInState());
  const stockManageService: StockManageService = useService(StockManageService);
  const { reduxState } = useContext(StockListManageContext);
  const [form] = Form.useForm();
  const confirmFormRef: MutableRefObject<any> = useRef();

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

  return { state, form, reduxState, selfSubmit, selfClose, getCurrentSelectInfo, callbackAction };
}
