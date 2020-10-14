import { IAllocationDetailState } from './allocation-detail.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { AllocationManageService } from '~/solution/model/services/allocation-manage.service';
import { useEffect } from 'react';
import { Subscription } from 'rxjs';
import { useHistory } from 'react-router-dom';
import { getQueryParams } from '~/framework/util/common';

export function useAllocationDetailStore() {
  const { state, setStateWrap } = useStateStore(new IAllocationDetailState());
  const history = useHistory();
  const allocationManageService: AllocationManageService = new AllocationManageService();
  let allocationManageServiceSubscription: Subscription;

  // 获取默认路由参数
  function getDefaultParams() {
    const { id = '' } = getQueryParams();
    id && getAlloactionDetail(id);
    setStateWrap({
      id
    });
  }

  //获取调拨单详情
  function getAlloactionDetail(id: string) {
    if (!id) return;
    allocationManageServiceSubscription = allocationManageService.allotDetail({ allotId: id }).subscribe(
      (res: any) => {
        console.log(res);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  useEffect(() => {
    getDefaultParams();
    return () => {
      allocationManageServiceSubscription && allocationManageServiceSubscription.unsubscribe();
    };
  }, []);
  return { state };
}
