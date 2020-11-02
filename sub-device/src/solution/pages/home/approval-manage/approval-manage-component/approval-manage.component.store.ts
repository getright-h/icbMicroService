import { IApprovalManageState } from './approval-manage.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';

export function useApprovalManageStore() {
  const { state, setStateWrap } = useStateStore(new IApprovalManageState());
  function getTableData() {}
  function callbackAction() {}
  return { state, getTableData, callbackAction };
}
