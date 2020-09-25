import { IDeviceStockInState, IDeviceStockInProps } from './device-stock-in.interface';
import { useService, useStateStore } from '~/framework/aop/hooks/use-base-store';
import { Form } from 'antd';
import { StockManageService } from '~/solution/model/services/stock-manage.service';
import { ShowNotification } from '~/framework/util/common';

export function useDeviceStockInStore(props: IDeviceStockInProps) {
  const { state, setStateWrap } = useStateStore(new IDeviceStockInState());
  const stockManageService: StockManageService = useService(StockManageService);
  const [form] = Form.useForm();

  function selfSubmit(values: any) {
    console.log(values);
    stockManageService.materialStockIn(values).subscribe(
      (res: any) => {
        ShowNotification.success('入库成功！');
        selfClose();
      },
      (err: any) => {
        ShowNotification.error(err);
      }
    );
  }
  function selfClose() {
    form.resetFields();
    props.close && props.close();
  }

  return { state, form, selfSubmit, selfClose };
}
