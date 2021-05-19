import { IDataScreenState } from './data-screen.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';

export function useDataScreenStore() {
  const { state, setStateWrap } = useStateStore(new IDataScreenState());
  return { state };
}
