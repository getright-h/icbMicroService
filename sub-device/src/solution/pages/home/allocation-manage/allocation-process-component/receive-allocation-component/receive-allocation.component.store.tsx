import * as React from 'react';
import { IReceiveAllocationState, ModalType } from './receive-allocation.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect } from 'react';
import { ShowNotification } from '~/framework/util/common';
import { AllocationManageService } from '~/solution/model/services/allocation-manage.service';

export function useReceiveAllocationStore() {
  const { state, setStateWrap } = useStateStore(new IReceiveAllocationState());
  const allocationManageService: AllocationManageService = new AllocationManageService();

  useEffect(() => {
    getTableData();
  }, []);

  function getTableData() {
    // setStateWrap({ isLoading: true });
    // receiveAllocationService.__getTableData__(state.searchForm).subscribe(
    //   res => {
    //     setStateWrap({ tableData: res.dataList, total: res.total, isLoading: false });
    //   },
    //   err => {
    //     setStateWrap({ isLoading: false });
    //     ShowNotification.error(err);
    //   }
    // );
    setStateWrap({
      tableData: [
        {
          id: '826',
          orderNum: '100023548',
          target: 'B大区仓库',
          type: 'ODB-10001，100个',
          total: 100,
          createTime: '2020-08-28',
          creater: '孙杜昂',
          status: '待申请'
        }
      ]
    });
  }

  function onChange(value: any, valueType: string) {
    setStateWrap({
      searchForm: {
        ...state.searchForm,
        [valueType]: value
      }
    });
  }
  function searchClick() {
    const { searchForm } = state;
    searchForm.page = 1;
    setStateWrap({ searchForm });
    getTableData();
  }

  function callbackAction<T>(actionType: number, data: T) {
    setStateWrap({ currentId: data.id });
    switch (actionType) {
      case ModalType.EDIT:
        break;
      case ModalType.DELETE:
        break;
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
    setStateWrap({ visibleModal: false });
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
