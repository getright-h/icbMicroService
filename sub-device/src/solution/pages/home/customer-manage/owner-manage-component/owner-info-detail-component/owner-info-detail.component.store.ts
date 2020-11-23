import { IOwnerInfoDetailState, IOwnerInfoDetailProps } from './owner-info-detail.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect } from 'react';
import { CustomerManageService } from '~/solution/model/services/customer-manage.service';

export function useOwnerInfoDetailStore(props: IOwnerInfoDetailProps) {
  const { state, setStateWrap } = useStateStore(new IOwnerInfoDetailState());
  const customerManageService: CustomerManageService = new CustomerManageService();

  useEffect(() => {
    props.id && getDetails(props.id);
  }, [props.id]);

  function toggleShowMore() {
    setStateWrap({ hasMore: !state.hasMore });
  }

  function getDetails(id: string) {
    customerManageService.getOwnerDetail(id).subscribe(res => {
      setStateWrap({ details: res });
    });
  }

  function selfClose() {
    props?.close();
  }

  return { state, selfClose, toggleShowMore };
}
