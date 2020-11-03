import * as React from 'react';
import { IApprovalTableState, ModalType } from './approval-table.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect } from 'react';
import { ApprovalManageService } from '~/solution/model/services/approval-manage.service';
import { Form } from 'antd';

export function useApprovalTableStore() {
  const { state, setStateWrap, getState } = useStateStore(new IApprovalTableState());
  const approvalManageService: ApprovalManageService = new ApprovalManageService();
  const [searchForm] = Form.useForm();

  useEffect(() => {
    getTableData();
  }, []);

  function getTableData() {
    setStateWrap({ isLoading: true });
    const { pageIndex, pageSize } = getState();
    approvalManageService
      .queryApprovalApplyList({
        ...searchForm.getFieldsValue(),
        index: pageIndex,
        size: pageSize
      })
      .subscribe(
        res => {
          setStateWrap({ tableData: res.data, total: res.total, isLoading: false });
        },
        err => {
          setStateWrap({ isLoading: false });
        }
      );
  }

  function searchClick() {
    setStateWrap({ pageIndex: 1 });
    getTableData();
  }

  function initSearchForm() {
    searchForm.resetFields();
  }

  function callbackAction<T>(actionType: number, data: T) {
    setStateWrap({ currentId: data.id });
    switch (actionType) {
      case ModalType.EDIT:
        break;
      case ModalType.WITHDRAW:
        break;
      default:
        break;
    }
  }

  function changeTablePageIndex(pageIndex: number, pageSize: number) {
    setStateWrap({ pageIndex, pageSize });
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
  function setGroupId(value: string) {
    setStateWrap({ curGroupId: value || '' });
    searchForm.setFieldsValue({ templateId: null });
  }
  return {
    state,
    searchForm,
    callbackAction,
    changeTablePageIndex,
    searchClick,
    handleModalCancel,
    openModal,
    initSearchForm,
    setGroupId
  };
}
