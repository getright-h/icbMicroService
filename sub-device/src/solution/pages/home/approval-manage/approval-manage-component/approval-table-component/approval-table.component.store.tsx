import * as React from 'react';
import { IApprovalTableState, ModalType } from './approval-table.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect, useRef } from 'react';
import { ApprovalManageService } from '~/solution/model/services/approval-manage.service';
import { Form } from 'antd';
import confirm from 'antd/lib/modal/confirm';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { QueryApprovalApplyListReturn } from '~/solution/model/dto/approval-manage.dto';
import { useHistory } from 'react-router-dom';
import { IApprovalApplyState } from '../approval-apply-component/approval-apply.interface';

export function useApprovalTableStore() {
  const { state, setStateWrap, getState } = useStateStore(new IApprovalTableState());
  const approvalManageService: ApprovalManageService = new ApprovalManageService();
  const [searchForm] = Form.useForm();
  const history = useHistory();
  const currentTemplate = useRef('');
  useEffect(() => {
    getTableData();
  }, []);

  function getCurrentTemplateId(state: IApprovalApplyState) {
    // 获取当前的模板ID
    currentTemplate.current = state.curTemplateId;
    setStateWrap({
      chooseModalVisible: false
    });
    history.push(`./approvalTemplateFormModal/${state.curTemplateId}/${state.curGroupName}/${state.curGroupId}`);
  }

  function changeChooseModalVisible(status?: boolean) {
    setStateWrap({
      chooseModalVisible: !!status
    });
  }

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
    setStateWrap({
      pageIndex: 1
    });
    getTableData();
  }

  function callbackAction(data: QueryApprovalApplyListReturn, actionType: number) {
    setStateWrap({ currentId: data.id });
    switch (actionType) {
      case ModalType.DETAIL:
        history.push(`./approvalManageDetail/${data.id}/0`);
        break;
      case ModalType.WITHDRAW:
        withdrawApproval(data);
        break;
      case ModalType.EDIT:
        history.push(`./approvalEditTemplateFormModal/${data.id}/1`);
        break;
      default:
        break;
    }
  }

  function withdrawApproval(element: any) {
    confirm({
      title: '撤回',
      icon: <ExclamationCircleOutlined />,
      content: '是否撤回当前申请',
      okText: '删除',
      onOk() {
        return new Promise(resolve => {
          confirmWithdrawApproval(resolve, element);
        });
      },
      onCancel() {
        console.log('Cancel');
      }
    });
  }

  function confirmWithdrawApproval(resolve: Function, element: any) {
    approvalManageService.flowRevoke({ id: element.id }).subscribe(() => {
      resolve();
    });
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
    changeChooseModalVisible,
    getCurrentTemplateId,
    initSearchForm,
    setGroupId
  };
}
