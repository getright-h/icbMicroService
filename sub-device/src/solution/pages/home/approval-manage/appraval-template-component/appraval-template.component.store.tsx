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
export function useApprovalTemplateStore(appravalTemplateState: {
  currentSelectNode: { isAll: boolean; node: EventDataNode };
}) {
  const { state, setStateWrap, getState } = useStateStore(new IAppravalTemplateState());
  const history = useHistory();
  const { currentSelectNode } = appravalTemplateState;
  const approvalManageService: ApprovalManageService = useService(ApprovalManageService);

  useEffect(() => {
    getTableData();
  }, [currentSelectNode]);

  function getTableData() {
    approvalManageService
      .queryApprovalFormTemplatePagedList({
        groupId: (currentSelectNode.node && currentSelectNode.node.key) || '',
        ...getState().searchForm,
        beginTime: 0,
        endTime: 0
      })
      .subscribe(res => {
        setStateWrap({
          tableData: res.dataList,
          total: res.total
        });
      });
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

  function callbackAction<T>(data: any, actionType: number) {
    switch (actionType) {
      case ModalType.EDIT:
        history.push(`/home/approvalManage/addTemplate/${data.id}/1`);
        break;
      case ModalType.MOVE:
        // 启用禁用
        openOrCloseTemplate(data);
        break;
      case ModalType.DELETE:
        deleteTempate(data);
        break;
      default:
        break;
    }
  }

  function deleteTempate(element: any) {
    // 删除组的弹窗
    confirm({
      title: '删除',
      icon: <ExclamationCircleOutlined />,
      content: '是否删除当前组',
      okText: '删除',
      onOk() {
        return new Promise(resolve => {
          confirmDeleteWarehouse(resolve, element);
        });
      },
      onCancel() {
        console.log('Cancel');
      }
    });
  }

  function confirmDeleteWarehouse(resolve: Function, element: any) {
    approvalManageService.deleteApprovalGroup({ id: element.id }).subscribe(() => {
      ShowNotification.success('删除成功');

      resolve();
    });
  }

  function openOrCloseTemplate(data: { id: string }) {
    approvalManageService.setFormTemplateState({ id: data.id }).subscribe(() => {
      setStateWrap({
        searchForm: {
          ...state.searchForm,
          index: 1
        }
      });
      getTableData();
    });
  }

  function addTemplate() {
    history.push(`/home/approvalManage/addTemplate/${currentSelectNode.node.key}/0`);
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
    getTableData,
    changeTablePageIndex,
    callbackAction,
    addTemplate,
    handleFormDataChange,
    moveTemplate,
    closeMoveTemplateModal
  };
}
