import { IStockDeviceState, IStockDeviceProps } from './stock-device.interface';
import { useService, useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect } from 'react';
import { StockManageService } from '~/solution/model/services/stock-manage.service';

export function useStockDeviceStore(props: IStockDeviceProps) {
  const { state, setStateWrap } = useStateStore(new IStockDeviceState());
  const stockManageService: StockManageService = useService(StockManageService);

  useEffect(() => {
    props.id && getDetails(props.id);
  }, [props.id]);

  function getDetails(id: string) {
    stockManageService.queryInOutRecordDetail(id).subscribe(res => {
      setStateWrap({ tableData: res.contentList });
    });
  }

  function selfClose() {
    props.close?.();
  }
  return { state, selfClose };
}
