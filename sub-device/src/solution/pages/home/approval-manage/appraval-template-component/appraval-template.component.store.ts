import { useService, useStateStore } from '~/framework/aop/hooks/use-base-store';
import { IAppravalTemplateState } from './appraval-template.interface';
import { EventDataNode } from 'antd/lib/tree';
import { useHistory } from 'react-router-dom';
import { ApprovalManageService } from '~/solution/model/services/approval-manage.service';
import { useEffect } from 'react';
import { ModalType } from '~/solution/shared/constant/common.const';
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

  function callbackAction<T>(actionType: number, data: T) {
    switch (actionType) {
      case ModalType.EDIT:
        break;
      case ModalType.DELETE:
        break;
      default:
        break;
    }
  }

  function addTemplate() {
    history.push(`/home/approvalManage/addTemplate/${currentSelectNode.node.key}`);
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
