import { IAllocationDetailState } from './allocation-detail.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { AllocationManageService } from '~/solution/model/services/allocation-manage.service';
import { useEffect } from 'react';
import { Subscription } from 'rxjs';
import { RouteComponentProps } from 'react-router-dom';
export function useAllocationDetailStore() {
  const { state, setStateWrap } = useStateStore(new IAllocationDetailState());

  return { state };
}
