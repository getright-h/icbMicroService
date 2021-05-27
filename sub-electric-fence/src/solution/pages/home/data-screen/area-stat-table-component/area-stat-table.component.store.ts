import { IAreaStatTableState } from './area-stat-table.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';

export function useAreaStatTableStore() {
  const { state, setStateWrap } = useStateStore(new IAreaStatTableState());
  return { state };
}
