import { IOrderDetailState, IOrderDetailProps } from './order-detail.interface';
import { useService, useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect } from 'react';
import { StockManageService } from '~/solution/model/services/stock-manage.service';
import { ShowNotification } from '~/framework/util/common';

export function useOrderDetailStore(props: IOrderDetailProps) {
  const { state, setStateWrap } = useStateStore(new IOrderDetailState());
  const stockManageService: StockManageService = useService(StockManageService);

  useEffect(() => {
    props.id && getDetails(props.id);
  }, [props.id]);

  function getDetails(id: string) {
    stockManageService.queryPurchaseDetail(id).subscribe(
      res => {
        setStateWrap({ details: res });
      },
      err => {
        ShowNotification.error(err);
      }
    );
  }

  function selfClose() {
    props.close?.();
  }

  return { state, selfClose };
}
