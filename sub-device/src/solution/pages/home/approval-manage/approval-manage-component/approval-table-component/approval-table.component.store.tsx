import * as React from 'react';
import { IApprovalTableState, ModalType } from './approval-table.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect } from 'react';
import { ShowNotification } from '~/framework/util/common';

export function useApprovalTableStore() {
  const { state, setStateWrap } = useStateStore(new IApprovalTableState());
  // const approvalTableService: ApprovalTableService = new ApprovalTableService();

  useEffect(() => {
    getTableData();
  }, []);

  function getTableData() {
    // setStateWrap({ isLoading: true });
    // approvalTableService.__getTableData__(state.searchForm).subscribe(
    //   res => {
    //     setStateWrap({ tableData: res.dataList, total: res.total, isLoading: false });
    //   },
    //   err => {
    //     setStateWrap({ isLoading: false });
    //     ShowNotification.error(err);
    //   }
    // );
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
    searchForm.index = 1;
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
    searchForm.index = index;
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
    getTableData,
    onChange
  };
}
