import { IAllocationManageState, ModalType } from './allocation-manage.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect } from 'react';
import { Modal } from 'antd';
import { AllocationManageService } from '~/solution/model/services/allocation-manage.service';
import { ShowNotification } from '~/framework/util/common';
import { useHistory } from 'react-router-dom';
import { Subscription } from 'rxjs';

const { confirm } = Modal;
export function useAllocationManageStore() {
  const { state, setStateWrap } = useStateStore(new IAllocationManageState());
  const allocationManageService: AllocationManageService = new AllocationManageService();
  let allocationManageServiceSubscribable: Subscription;
  const history = useHistory();

  useEffect(() => {
    getTableData();
    return () => {
      allocationManageServiceSubscribable && allocationManageServiceSubscribable.unsubscribe();
    };
  }, []);

  function getTableData() {
    setStateWrap({ isLoading: true });
    allocationManageServiceSubscribable = allocationManageService.queryAllotPagedList(state.searchForm).subscribe(
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

  function callbackAction<T>(actionType: number, data?: T) {
    setStateWrap({ currentId: data ? data.id : '' });
    switch (actionType) {
      case ModalType.ALLOCATE:
        history.push('/home/allocation/process');
        break;
      case ModalType.DETAIL:
        history.push(`/home/allocation/allocationDetail/${data.id}`);
        break;
      case ModalType.CREATE:
        history.push('/home/allocation/createAllocation');
        break;
      case ModalType.EDIT:
        history.push(`/home/allocation/editAllocation/${data.id}`);
        break;
      case ModalType.DELETE:
        deleteAlloaction();
        break;
      case ModalType.RECORD:
        setStateWrap({ visibleModal: true });
      default:
        break;
    }
  }

  function deleteAlloaction() {
    confirm({
      content: '确认删除此调拨',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      }
    });
  }

  function changeTablePageIndex(index: number, pageSize: number) {
    const { searchForm } = state;
    searchForm.index = index;
    searchForm.size = pageSize;
    setStateWrap({ searchForm });
    getTableData();
  }

  function handleModalCancel() {
    setStateWrap({ visibleModal: false, visibleDeleteModal: false });
  }
  function openModal(type: ModalType) {
    switch (type) {
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
