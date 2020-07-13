import { IMainFenceManageState } from './main-fence-manage.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useRef, useCallback } from 'react';
import { FenceManageListReturnModal } from '~/solution/model/dto/fence-manage.dto';

export function useMainFenceManageStore() {
  const { state, setStateWrap } = useStateStore(new IMainFenceManageState());
  const tableRef: {
    current: {
      onValueChange: (key: string, value: string) => void;
      searchClick: () => void;
    };
  } = useRef();

  function onValueChange<T>(key: string, value: T) {
    setStateWrap({
      [key]: value
    });
  }

  const searchClick = useCallback(() => tableRef.current.searchClick(), [tableRef]);
  const changeSearchTableValue = (key: string, value: any) => tableRef.current.onValueChange(key, value);

  function editPopShow(data: FenceManageListReturnModal) {
    setStateWrap({
      visible: true,
      singleFenceData: data
    });
  }
  // function onCrPlaceChangeBack(value)
  return {
    state,
    tableRef,
    onValueChange,
    searchClick,
    editPopShow,
    changeSearchTableValue
  };
}
