import { IDigitCellState } from './digit-cell.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';

export function useDigitCellStore() {
  const { state, setStateWrap } = useStateStore(new IDigitCellState());
  return { state };
}
