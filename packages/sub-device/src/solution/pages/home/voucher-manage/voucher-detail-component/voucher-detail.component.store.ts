import { IVoucherDetailProps, IVoucherDetailState } from './voucher-detail.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect } from 'react';
import { VoucherManageService } from '~/solution/model/services/voucher-manage.service';

export function useVoucherDetailStore(props: IVoucherDetailProps) {
  const { state, setStateWrap } = useStateStore(new IVoucherDetailState());
  const voucherManageService: VoucherManageService = new VoucherManageService();

  useEffect(() => {
    if (props.id && props.visible) {
      getDetails(props.id);
    }
  }, [props.id, props.visible]);

  function getDetails(id: string) {
    voucherManageService.getDispatchDetail(id).subscribe(res => {
      setStateWrap({ details: res });
    });
  }
  function selfClose() {
    props?.close();
  }
  return { state, selfClose };
}
