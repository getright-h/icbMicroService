import { IPositionMonitorRightState } from './position-monitor-right.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import * as _ from 'lodash';

export function usePositionMonitorRightStore() {
  const { state, setStateWrap } = useStateStore(new IPositionMonitorRightState());

  // 追踪
  function searchCar(id: string) {
    // 寻找当前的car
    setStateWrap({
      mapbtnTrackrVisible: true
    });
  }

  function drawDrivingLine(id: string) {
    // 寻找当前的car
    setStateWrap({
      mapbtnDrivingVisible: true
    });
  }

  function closeMapDrivingPage() {
    setStateWrap({
      mapbtnDrivingVisible: false
    });
  }

  function closeMapbtnPage() {
    setStateWrap({
      mapbtnTrackrVisible: false
    });
  }

  return { state, searchCar, closeMapbtnPage, closeMapDrivingPage, drawDrivingLine };
}
