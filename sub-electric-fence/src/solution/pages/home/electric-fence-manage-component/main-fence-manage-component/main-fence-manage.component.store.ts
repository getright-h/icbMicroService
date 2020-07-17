import { IMainFenceManageState } from './main-fence-manage.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useRef, useCallback } from 'react';
import { FenceManageListReturnModal, FenceManageEditParamsModal } from '~/solution/model/dto/fence-manage.dto';
import { FenceManageService } from '~/solution/model/services/fence-manage.service';
import { FenceManageCreateParamsModal } from '../../../../model/dto/fence-manage.dto';
import { FENCETYPENUM } from './create-electric-fence-component/create-electric-fence.interface';

export function useMainFenceManageStore() {
  const { state, setStateWrap } = useStateStore(new IMainFenceManageState());
  const fenceManageService = new FenceManageService();
  const tableRef: {
    current: {
      onValueChange: (key: string, value: string) => void;
      searchClick: () => void;
    };
  } = useRef();

  function rowClick(record: FenceManageListReturnModal) {
    setStateWrap({
      mapInfo: record
    });
  }

  function onValueChange(key: string, value: any) {
    if (key == 'formValueAndSubmit') {
      if (state.isEdit) {
        editFence({ ...state.singleFenceData, polyline: state.polygon, ...value });
        return;
      }
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

  // 保证传给后端的是个code
  function editFence(fenceData: FenceManageEditParamsModal | any) {
    fenceManageService.fenceEdit(fenceData).subscribe(res => {
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
      singleFenceData: data,
      isEdit: true
    });
  }
  // function onCrPlaceChangeBack(value)
  return {
    state,
    rowClick,
    tableRef,
    onValueChange,
    searchClick,
    editPopShow,
    changeSearchTableValue
  };
}
