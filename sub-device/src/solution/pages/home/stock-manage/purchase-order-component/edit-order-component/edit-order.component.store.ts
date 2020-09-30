import { IEditOrderState, IEditOrderProps } from './edit-order.interface';
import { useService, useStateStore } from '~/framework/aop/hooks/use-base-store';
import { Form } from 'antd';
import { useCallback, useEffect, useRef } from 'react';
import { ShowNotification } from '~/framework/util/common';
import { StockManageService } from '~/solution/model/services/stock-manage.service';
import moment from 'moment';
import { DeviceListItem } from '~/solution/model/dto/stock-manage.dto';

export function useEditOrderStore(props: IEditOrderProps) {
  const { state, setStateWrap } = useStateStore(new IEditOrderState());
  const stockManageService: StockManageService = useService(StockManageService);
  const [form] = Form.useForm();

  useEffect(() => {
    if (props.id && props.visible) {
      getDetails(props.id);
    }
  }, [props.id, props.visible]);

  function getDetails(id: string) {
    stockManageService.queryPurchaseDetail(id).subscribe(
      res => {
        form.setFieldsValue({
          ...res,
          totalAmount: res.sumAmount,
          purchaseTime: moment(res.purchaseTime, 'YYYY-MM-DD HH:mm:ss')
        });
        setStateWrap({
          editSupplierName: res.supplierName,
          editPurchaseTime: res.purchaseTime,
          editDeviceList: res.deviceList
        });
      },
      err => {
        ShowNotification.error(err);
      }
    );
  }

  function getCurrentSelectInfo(typeName: string, option: any) {
    switch (typeName) {
      case 'supplier':
        setStateWrap({ editSupplierName: option?.info.name });
        break;
    }
  }

  function handleDeviceListChange(typeName: string, option: any, index: number) {
    const deviceList = form.getFieldsValue(['deviceList']).deviceList;
    !deviceList[index] && (deviceList[index] = {});
    switch (typeName) {
      case 'type':
        deviceList[index].typeId = option?.info.id;
        deviceList[index].typeName = option?.info.name;
        break;
      default:
        deviceList[index][typeName] = option;
        break;
    }
    form.setFieldsValue([deviceList]);
    setTotalAmount();
  }

  function setTotalAmount() {
    const deviceList = form.getFieldsValue(['deviceList']).deviceList;
    let totalAmount = 0;
    deviceList.forEach((info: DeviceListItem) => {
      if (info.number && info.amount) {
        totalAmount += info.number * info.amount;
      }
    });
    form.setFieldsValue({ totalAmount });
  }

  function selfSubmit(values: any) {
    // setStateWrap({ confirmLoading: true });
    console.log(values);
    // if (props.id) {
    //   // 编辑
    //   stockManageService.updatePurchase(values).subscribe(
    //     res => {
    //       ShowNotification.success('已更新采购单！');
    //       setStateWrap({ confirmLoading: false });
    //       selfClose();
    //     },
    //     err => {
    //       setStateWrap({ confirmLoading: false });
    //       ShowNotification.error(err);
    //     }
    //   );
    // } else {
    //   // 新增
    //   stockManageService.insertPurchase(values).subscribe(
    //     res => {
    //       ShowNotification.success('新增采购单成功！');
    //       setStateWrap({ confirmLoading: false });
    //       selfClose();
    //     },
    //     err => {
    //       setStateWrap({ confirmLoading: false });
    //       ShowNotification.error(err);
    //     }
    //   );
    // }
  }
  function selfClose() {
    form.resetFields();
    props.close?.();
  }

  return { state, form, selfSubmit, selfClose, getCurrentSelectInfo, handleDeviceListChange, setTotalAmount };
}
