import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { IAppravalTemplateState } from './appraval-template.interface';
import { EventDataNode } from 'antd/lib/tree';
export function useApprovalTemplateStore(appravalTemplateState: { currentSelectNode: EventDataNode }) {
  const { state, setStateWrap } = useStateStore(new IAppravalTemplateState());

  function getTableData() {}

  function changeTablePageIndex(index: number, pageSize: number) {}

  function callbackAction() {}

  function addTemplate() {}

  function handleFormDataChange(key: string, value: string) {}

  return { state, getTableData, changeTablePageIndex, callbackAction, addTemplate, handleFormDataChange };
}
