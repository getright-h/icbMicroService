import { IApprovalerListState } from './approvaler-list.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';

export function useApprovalerListStore() {
  const { state, setStateWrap } = useStateStore(new IApprovalerListState());
  return { state };
}
