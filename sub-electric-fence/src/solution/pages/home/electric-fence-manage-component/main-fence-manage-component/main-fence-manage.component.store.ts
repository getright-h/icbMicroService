import { IMainFenceManageState } from './main-fence-manage.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useRef, useCallback } from 'react';
import { FenceManageListReturnModal } from '~/solution/model/dto/fence-manage.dto';
import { FenceManageService } from '~/solution/model/services/fence-manage.service';
import { FenceManageCreateParamsModal } from '../../../../model/dto/fence-manage.dto';

export function useMainFenceManageStore() {
  const { state, setStateWrap } = useStateStore(new IMainFenceManageState());
  const fenceManageService = new FenceManageService();
  const tableRef: {
    current: {
      onValueChange: (key: string, value: string) => void;
      searchClick: () => void;
    };
  } = useRef();

  function onValueChange(key: string, value: any) {
    console.log(key, value);
    if (key == 'formValueAndSubmit') {
      createFence({ polyline: state.polygon, ...value });
      return;
    }
    setStateWrap({
      [key]: value
    });
  }

  function createFence(fenceData: FenceManageCreateParamsModal) {
    fenceManageService.fenceCreate(fenceData).subscribe(res => {
      setStateWrap({
        visible: false
      });
      searchClick();
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
