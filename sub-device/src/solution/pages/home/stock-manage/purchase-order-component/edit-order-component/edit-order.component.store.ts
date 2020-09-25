import { IEditOrderState, IEditOrderProps } from './edit-order.interface';
import { useService, useStateStore } from '~/framework/aop/hooks/use-base-store';
import { Form } from 'antd';
import { useEffect, useRef } from 'react';
import { ShowNotification } from '~/framework/util/common';
import { StockManageService } from '~/solution/model/services/stock-manage.service';

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
          totalAmount: res.sumAmount
        });
      },
      err => {
        ShowNotification.error(err);
      }
    );
  }

  function selfSubmit(values: any) {
    setStateWrap({ confirmLoading: true });
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

  return { state, form, selfSubmit, selfClose };
}
