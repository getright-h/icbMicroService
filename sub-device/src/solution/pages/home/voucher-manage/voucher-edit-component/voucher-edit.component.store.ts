import { IVoucherEditState, IVoucherEditProps } from './voucher-edit.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { Form } from 'antd';
import { useEffect } from 'react';
import { VoucherManageService } from '~/solution/model/services/voucher-manage.service';

export function useVoucherEditStore(props: IVoucherEditProps) {
  const { state, setStateWrap } = useStateStore(new IVoucherEditState());
  const voucherManageService: VoucherManageService = new VoucherManageService();
  const [form] = Form.useForm();

  useEffect(() => {
    props.id && getDetails(props.id);
  }, [props.id]);

  function getDetails(id: string) {
    // voucherManageService.getdetail(id).subscribe(
    //   res => {
    //     setStateWrap({ details: res });
    //     form.setFieldsValue(res)
    //   },
    //   err => {
    //     ShowNotification.error(err);
    //   }
    // );
  }

  function selfSubmit(values: any) {
    console.log(values);
    if (props.id) {
      // 编辑
    } else {
      // 新增
    }
  }
  function selfClose() {
    form.resetFields();
    props?.close();
  }

  return { state, form, selfSubmit, selfClose };
}
