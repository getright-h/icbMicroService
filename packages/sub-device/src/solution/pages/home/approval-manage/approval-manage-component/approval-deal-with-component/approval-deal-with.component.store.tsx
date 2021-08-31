import * as React from 'react';
import { IApprovalDealWithState, ModalType } from './approval-deal-with.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect } from 'react';
import { ApprovalManageService } from '~/solution/model/services/approval-manage.service';
import { Form } from 'antd';
import { QueryApprovalApplyListReturn } from '~/solution/model/dto/approval-manage.dto';
import { useHistory } from 'react-router-dom';

export function useApprovalDealWithStore() {
  const { state, setStateWrap, getState } = useStateStore(new IApprovalDealWithState());
  const approvalManageService: ApprovalManageService = new ApprovalManageService();
  const [searchForm] = Form.useForm();
  const history = useHistory();
  useEffect(() => {
    getTableData();
  }, []);

  function getTableData() {
    setStateWrap({ isLoading: true });
    const { pageIndex, pageSize } = getState();
    approvalManageService
      .queryApprovalProcessList({
        ...searchForm.getFieldsValue(),
        processStatus: searchForm.getFieldValue('processStatus'),
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
    setStateWrap({
      pageIndex: 1
    });
    getTableData();
  }

  function callbackAction(data: QueryApprovalApplyListReturn, actionType: number) {
    setStateWrap({ currentId: data.id });
    switch (actionType) {
      case ModalType.DETAIL:
        history.push(`./approvalManageDetail/${data.id}/1/${data?.audit?.flowAuditId}`);
        break;
      case ModalType.EDIT:
        history.push(`./approvalEditTemplateFormModal/${data.id}/1`);
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
