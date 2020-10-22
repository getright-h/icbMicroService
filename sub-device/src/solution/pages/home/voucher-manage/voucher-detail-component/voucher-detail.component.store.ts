import { IVoucherDetailProps, IVoucherDetailState } from './voucher-detail.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect } from 'react';
import { VoucherManageService } from '~/solution/model/services/voucher-manage.service';

export function useVoucherDetailStore(props: IVoucherDetailProps) {
  const { state, setStateWrap } = useStateStore(new IVoucherDetailState());
  const voucherManageService: VoucherManageService = new VoucherManageService();

  useEffect(() => {
    getDetails();
  }, []);

  function getDetails() {
    // setStateWrap({ isLoading: true });
    // voucherManageService.__getTableData__(state.searchForm).subscribe(
    //   res => {
    //     setStateWrap({ tableData: res.dataList, total: res.total, isLoading: false });
    //   },
    //   err => {
    //     setStateWrap({ isLoading: false });
    //     ShowNotification.error(err);
    //   }
    // );
    setStateWrap({ details: { vehicle: '97855' } });
  }
  function selfClose() {
    props?.close();
  }
  return { state, selfClose };
}
