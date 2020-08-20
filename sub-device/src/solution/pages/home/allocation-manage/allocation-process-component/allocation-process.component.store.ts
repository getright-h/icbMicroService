import { IAllocationProcessState } from './allocation-process.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';

export function useAllocationProcessStore() {
  const { state, setStateWrap } = useStateStore(new IAllocationProcessState());
  function changeTabKey(key: string) {
    setStateWrap({ activeKey: key });
  }
  return { state, changeTabKey };
}
