import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { IHooksReduxState } from './hooks-redux.interface';
export function useHomeStore() {
  const { state, setStateWrap } = useStateStore(new IHooksReduxState());

  return { state };
}
