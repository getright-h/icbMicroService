import { IViewFlowNodeState } from './view-flow-node.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';

export function useViewFlowNodeStore() {
  const { state, setStateWrap } = useStateStore(new IViewFlowNodeState());
  return { state };
}
