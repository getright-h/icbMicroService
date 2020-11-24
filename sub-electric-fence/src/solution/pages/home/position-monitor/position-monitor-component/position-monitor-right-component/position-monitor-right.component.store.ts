import { IPositionMonitorRightState } from './position-monitor-right.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';

export function usePositionMonitorRightStore() {
  const { state, setStateWrap } = useStateStore(new IPositionMonitorRightState());
  return { state };
}
