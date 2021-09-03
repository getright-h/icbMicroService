import { IHocHomeHeaderState } from './hoc-home-header.interface';
import { useStateStore } from '@fch/fch-tool';

export function useHocHomeHeaderStore() {
  const { state, setStateWrap } = useStateStore(new IHocHomeHeaderState());

  function popClose() {
    setStateWrap({ passwordVisible: false });
  }
  return { state, popClose };
}
