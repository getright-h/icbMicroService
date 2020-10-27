import { IApprovalLineState } from './approval-line.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';

export function useApprovalLineStore() {
  const { state, setStateWrap } = useStateStore(new IApprovalLineState());
  function approverInput() {
    // 添加弹窗
  }
  return { state };
}
