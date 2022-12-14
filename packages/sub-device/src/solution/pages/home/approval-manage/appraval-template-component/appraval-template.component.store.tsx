import { useService, useStateStore } from '~/framework/aop/hooks/use-base-store';
import { IAppravalTemplateState } from './appraval-template.interface';
import { EventDataNode } from 'antd/lib/tree';
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { ApprovalManageService } from '~/solution/model/services/approval-manage.service';
import { useEffect } from 'react';
import { ModalType } from '~/solution/shared/constant/common.const';
import confirm from 'antd/lib/modal/confirm';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { ShowNotification } from '~/framework/util/common';
import { useAuthorityState } from '~/framework/aop/hooks/use-authority-state';
export function useApprovalTemplateStore(appravalTemplateState: {
  currentSelectNode: { isAll: boolean; node: EventDataNode };
}) {
  const { state, setStateWrap, getState } = useStateStore(new IAppravalTemplateState());
  const history = useHistory();
  const { currentSelectNode } = appravalTemplateState;
  const approvalManageService: ApprovalManageService = useService(ApprovalManageService);
  const { $auth } = useAuthorityState();

  useEffect(() => {
    getTableData();
  }, [currentSelectNode]);

  function getTableData() {
    setStateWrap({
      isLoading: true
    });
    approvalManageService
      .queryApprovalFormTemplatePagedList({
        groupId: (currentSelectNode.node && currentSelectNode.node.key) || '',
        ...getState().searchForm,
        beginTime: 0,
        endTime: 0
      })
      .subscribe(
        res => {
          setStateWrap({
            tableData: res.dataList,
            total: res.total,
            isLoading: false
          });
        },
        () => {
          setStateWrap({
            isLoading: false
          });
        }
      );
  }

  function changeTablePageIndex(index: number, pageSize: number) {
    setStateWrap({
      searchForm: {
        ...state.searchForm,
        index,
        size: pageSize
      }
    });
    getTableData();
  }

  function callbackAction<T>(data: any, actionType: number, value: boolean) {
    switch (actionType) {
      case ModalType.EDIT:
        history.push(`./addTemplate/${data.id}/1`);
        break;
      case ModalType.MOVE:
        // ????????????
        openOrCloseTemplate(data, value);
        break;
      case ModalType.DELETE:
        deleteTempate(data);
        break;
      default:
        break;
    }
  }

  function deleteTempate(element: any) {
    // ??????????????????
    confirm({
      title: '??????',
      icon: <ExclamationCircleOutlined />,
      content: '????????????????????????',
      okText: '??????',
      onOk() {
        return new Promise(resolve => {
          confirmDeleteTemplate(resolve, element);
        });
      },
      onCancel() {
        console.log('Cancel');
      }
    });
  }

  function confirmDeleteTemplate(resolve: Function, element: any) {
    const { id, groupId } = element;
    approvalManageService.deleteApprovalFormTemplate({ id, groupId }).subscribe(() => {
      ShowNotification.success('????????????');
      getTableData();
      resolve();
    });
  }

  function openOrCloseTemplate(data: { id: string }, value: boolean) {
    // ????????????????????????????????????????????????
    const tableData = state.tableData.map((item: any) => {
      if (data.id == item.id) {
        item.state = value ? 1 : 0;
      }
      return item;
    });

    setStateWrap({
      tableData
    });
    approvalManageService.setFormTemplateState({ id: data.id }).subscribe();
  }

  function addTemplate() {
    history.push(`./addTemplate/${currentSelectNode.node.key}/0`);
  }

  function moveTemplate() {
    setStateWrap({
      addMoveTemplateVisible: true
    });
  }

  function handleFormDataChange(key: string, value: string) {
    setStateWrap({
      searchForm: {
        ...state.searchForm,
        [key]: value
      }
    });
  }

  function closeMoveTemplateModal(isRefresh: boolean) {
    setStateWrap({
      addMoveTemplateVisible: false
    });
    isRefresh && getTableData();
  }

  return {
    state,
    $auth,
    getTableData,
    changeTablePageIndex,
    callbackAction,
    addTemplate,
    handleFormDataChange,
    moveTemplate,
    closeMoveTemplateModal
  };
}
