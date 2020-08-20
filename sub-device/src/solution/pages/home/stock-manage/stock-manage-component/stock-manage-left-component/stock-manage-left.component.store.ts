import { IStockManageLeftState } from './stock-manage-left.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';

export function useStockManageLeftStore() {
  const { state, setStateWrap } = useStateStore(new IStockManageLeftState());
  return { state };
}
