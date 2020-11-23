import { IPositionMonitorState } from './position-monitor.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';

export function usePositionMonitorStore() {
  const { state, setStateWrap } = useStateStore(new IPositionMonitorState());
  return { state };
}
