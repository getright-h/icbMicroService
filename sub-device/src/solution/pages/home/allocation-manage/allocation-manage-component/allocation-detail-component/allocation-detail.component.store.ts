import { IAllocationDetailState } from './allocation-detail.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';

export function useAllocationDetailStore() {
  const { state, setStateWrap } = useStateStore(new IAllocationDetailState());
  return { state };
}
