import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { IStore, IBread } from './bread.interface';

export function useBreadStore() {
  const { state, setStateWrap } = useStateStore(new IStore());

  function setBreads(breads: IBread[]) {
    setStateWrap({
      breads
    });
  }

  return { state, setBreads };
}
