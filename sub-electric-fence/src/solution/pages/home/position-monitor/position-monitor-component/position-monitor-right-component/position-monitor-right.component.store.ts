import { IPositionMonitorRightState } from './position-monitor-right.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import * as _ from 'lodash';

export function usePositionMonitorRightStore() {
  const { state, setStateWrap } = useStateStore(new IPositionMonitorRightState());

  // 追踪
  function searchCar() {
    // 寻找当前的car
    
  } 

  return { state, searchCar };
}
