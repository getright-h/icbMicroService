import { IDetailState } from './detail.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';

export function useDetailStore() {
  const { state, setStateWrap } = useStateStore(new IDetailState());
  return { state };
}
