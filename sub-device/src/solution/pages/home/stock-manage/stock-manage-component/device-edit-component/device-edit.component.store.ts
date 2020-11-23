import { IDeviceEditState, IDeviceEditProps } from './device-edit.interface';
import { useService, useStateStore } from '~/framework/aop/hooks/use-base-store';
import { Form } from 'antd';
import { useEffect } from 'react';
import { StockManageService } from '~/solution/model/services/stock-manage.service';
import { ShowNotification } from '~/framework/util/common';

export function useDeviceEditStore(props: IDeviceEditProps) {
  const { state, setStateWrap } = useStateStore(new IDeviceEditState());
  const stockManageService: StockManageService = useService(StockManageService);
  const [form] = Form.useForm();

  useEffect(() => {
    props.id && getDetails(props.id);
  }, [props.id]);

  function getDetails(id: string) {
    stockManageService.queryStockDeviceDetail(id).subscribe(res => {
      setStateWrap({ details: res });
    });
  }

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
        formData.purchaseName = option?.info.name;
        break;
    }
    setStateWrap({ formData });
  }

  function selfSubmit(values: any) {
    setStateWrap({ confirmLoading: true });
    const confirmForm = {
      ...values,
      purchaseId: values.purchaseId || '',
      purchaseCode: state.formData.purchaseCode || '',
      storeId: state.details.storeId,
      materialId: state.details.materialId
    };
    // console.log(confirmForm);
    stockManageService.materialStockUpdate(confirmForm).subscribe(
      (res: any) => {
        ShowNotification.success('编辑成功！');
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
    setStateWrap({ isEdit: false });
    props.close?.(isSuccess);
  }
  function changeToEdit() {
    setStateWrap({ isEdit: true, formData: state.details });
    form.setFieldsValue(state.details);
  }

  return { state, form, selfSubmit, selfClose, changeToEdit, getCurrentSelectInfo };
}
