import { IAllocationProcessState } from './allocation-process.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { getQueryParams } from '~/framework/util/common';
import { useEffect } from 'react';

export function useAllocationProcessStore() {
  const { state, setStateWrap } = useStateStore(new IAllocationProcessState());
  const { active } = getQueryParams();
  function changeTabKey(key: string) {
    setStateWrap({ activeKey: key });
  }
  useEffect(() => {
    changeTabKey(active);
  }, []);
  return { state, changeTabKey };
}
