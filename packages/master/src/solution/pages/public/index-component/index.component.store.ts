import { IIndexState } from './index.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';

export function useIndexStore() {
  const { state, setStateWrap } = useStateStore(new IIndexState());
  return { state };
}
