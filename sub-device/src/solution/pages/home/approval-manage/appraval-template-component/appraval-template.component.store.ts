import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { IAppravalTemplateState } from './appraval-template.interface';
import { EventDataNode } from 'antd/lib/tree';
import { useHistory } from 'react-router-dom';
export function useApprovalTemplateStore(appravalTemplateState: { currentSelectNode: EventDataNode }) {
  const { state, setStateWrap } = useStateStore(new IAppravalTemplateState());
  const history = useHistory();
  function getTableData() {}

  function changeTablePageIndex(index: number, pageSize: number) {}

  function callbackAction() {}

  function addTemplate() {
    history.push('/home/approvalManage/addTemplate');
  }

  function moveTemplate() {
    setStateWrap({
      addMoveTemplateVisible: true
    });
  }

  function handleFormDataChange(key: string, value: string) {}

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
