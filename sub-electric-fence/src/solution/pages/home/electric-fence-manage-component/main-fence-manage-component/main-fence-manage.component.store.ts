import { IMainFenceManageState } from './main-fence-manage.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useRef, useCallback } from 'react';

export function useMainFenceManageStore() {
  const { state, setStateWrap } = useStateStore(new IMainFenceManageState());
  const tableRef: {
    current: {
      onValueChange: (key: string, value: string) => void;
      searchClick: () => void;
    };
  } = useRef();

  function onValueChange(key: string, value: any) {
    setStateWrap({
      [key]: value
    });
  }

  return {
    state,
    tableRef,
    onValueChange
  };
}
