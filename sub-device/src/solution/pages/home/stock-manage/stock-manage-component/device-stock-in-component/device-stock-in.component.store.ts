import { IDeviceStockInState, IDeviceStockInProps } from './device-stock-in.interface';
import { useService, useStateStore } from '~/framework/aop/hooks/use-base-store';
import { Form } from 'antd';
import { StockManageService } from '~/solution/model/services/stock-manage.service';
import { ShowNotification } from '~/framework/util/common';
import { useContext } from 'react';
import { StockListManageContext } from '../stock-manage.component';

export function useDeviceStockInStore(props: IDeviceStockInProps) {
  const { state, setStateWrap } = useStateStore(new IDeviceStockInState());
  const stockManageService: StockManageService = useService(StockManageService);
  const { reduxState } = useContext(StockListManageContext);
  const [form] = Form.useForm();

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
    const confirmForm = {
      ...values,
      ...state.formData,
      storeId: reduxState.currentSelectNode.id,
      storeName: reduxState.currentSelectNode.name
    };
    stockManageService.materialStockIn(confirmForm).subscribe(
      (res: any) => {
        ShowNotification.success('入库成功！');
        setStateWrap({ confirmLoading: false });
        selfClose(true);
      },
      (err: any) => {
        setStateWrap({ confirmLoading: false });
      }
    );
  }

  function selfClose(isSuccess = false) {
    form.resetFields();
    props.close?.(isSuccess);
  }

  return { state, form, reduxState, selfSubmit, selfClose, getCurrentSelectInfo };
}
