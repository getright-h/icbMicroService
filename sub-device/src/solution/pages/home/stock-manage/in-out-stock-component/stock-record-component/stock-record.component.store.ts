import { IStockRecordState, IStockRecordProps } from './stock-record.interface';
import { useService, useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect } from 'react';
import { StockManageService } from '~/solution/model/services/stock-manage.service';

export function useStockRecordStore(props: IStockRecordProps) {
  const { state, setStateWrap } = useStateStore(new IStockRecordState());
  const stockManageService: StockManageService = useService(StockManageService);

  useEffect(() => {
    props.id && getDetails(props.id);
  }, [props.id]);

  function getDetails(id: string) {
    stockManageService.queryInOutRecordDetail(id).subscribe(res => {
      setStateWrap({ details: res });
    });
  }

  function selfClose() {
    props.close?.();
  }
  return { state, selfClose };
}
