import { IInitAllocationState, ModalType } from './init-allocation.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect } from 'react';
import { ShowNotification } from '~/framework/util/common';
import { AllocationManageService } from '~/solution/model/services/allocation-manage.service';
import { useHistory } from 'react-router-dom';

export function useInitAllocationStore() {
  const { state, setStateWrap } = useStateStore(new IInitAllocationState());
  const allocationManageService: AllocationManageService = new AllocationManageService();
  const history = useHistory();

  useEffect(() => {
    getTableData();
  }, []);

  function getTableData() {
    setStateWrap({ isLoading: true });
    allocationManageService.queryAllotPromoterPagedList(state.searchForm).subscribe(
      res => {
        setStateWrap({ tableData: res.dataList, total: res.total, isLoading: false });
      },
      err => {
        setStateWrap({ isLoading: false });
        ShowNotification.error(err);
      }
    );
  }

  function onChange(value: any, valueType: string) {
    const { searchForm } = state;
    if (valueType == 'time') {
      searchForm.beginTime = Date.parse(value[0]);
      searchForm.endTime = Date.parse(value[1]);
    }
    setStateWrap({
      searchForm: {
        ...searchForm,
        [valueType]: value
      }
    });
  }
  function searchClick() {
    const { searchForm } = state;
    searchForm.index = 1;
    setStateWrap({ searchForm });
    getTableData();
  }

  function callbackAction<T>(actionType: number, data: T) {
    setStateWrap({ currentId: data.id, currentData: data });
    switch (actionType) {
      case ModalType.CREATE:
        setStateWrap({ importVisible: true });
        break;
      case ModalType.ROLLBACK:
        setStateWrap({ rollbackVisible: true });
        break;
      case ModalType.DETAIL:
        history.push(`/home/allocation/initDetail/${data.id}`);
      default:
        break;
    }
  }

  function changeTablePageIndex(index: number, pageSize: number) {
    const { searchForm } = state;
    searchForm.page = index;
    searchForm.size = pageSize;
    setStateWrap({ searchForm });
    getTableData();
  }

  function handleModalCancel() {
    setStateWrap({ currentData: {}, importVisible: false, rollbackVisible: false });
  }
  function openModal(type: ModalType) {
    switch (type) {
      case ModalType.CREATE:
        break;
      default:
        break;
    }
  }
  return {
    state,
    callbackAction,
    changeTablePageIndex,
    searchClick,
    handleModalCancel,
    openModal,
    onChange
  };
}
