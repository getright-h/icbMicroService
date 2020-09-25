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
    stockManageService.queryStockDeviceDetail(id).subscribe(
      res => {
        setStateWrap({ details: res });
      },
      err => {
        ShowNotification.error(err);
      }
    );
  }

  function selfSubmit(values: any) {
    console.log(values);
    stockManageService.materialStockUpdate(values).subscribe(
      (res: any) => {
        ShowNotification.success('编辑成功！');
        selfClose();
      },
      (err: any) => {
        ShowNotification.error(err);
      }
    );
  }
  function selfClose() {
    form.resetFields();
    setStateWrap({ isEdit: false });
    props.close?.();
  }
  function changeToEdit() {
    setStateWrap({ isEdit: true });
  }

  return { state, form, selfSubmit, selfClose, changeToEdit };
}
