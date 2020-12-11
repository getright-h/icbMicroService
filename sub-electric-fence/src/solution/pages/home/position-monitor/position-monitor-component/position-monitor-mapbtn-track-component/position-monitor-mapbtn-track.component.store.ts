import { IPositionMonitorMapbtnTrackState } from './position-monitor-mapbtn-track.interface';
import { useStateStore, useService } from '~/framework/aop/hooks/use-base-store';
import { useEffect } from 'react';
import { PositionMonitorContext } from '../position-monitor.component';
import { PositionMonitorService } from '~/solution/model/services/position-monitor.service';
export function usePositionMonitorMapbtnTrackStore() {
  const { state, setStateWrap } = useStateStore(new IPositionMonitorMapbtnTrackState());
  const { reduxState } = React.useContext(PositionMonitorContext);
  const positionMonitorService: PositionMonitorService = useService(PositionMonitorService);
  const { currentDoActionCarInfo } = reduxState;

  useEffect(() => {
    getCurrentTrack(currentDoActionCarInfo.deviceInfo.deviceCode);
  }, [currentDoActionCarInfo]);

  function getCurrentTrack(code: string) {
    positionMonitorService.realTimeTracking({ code }).subscribe(res => {
      setStateWrap({ carLine: res });
    });
  }

  function refreshContentInfo() {
    getCurrentTrack(currentDoActionCarInfo.deviceInfo.deviceCode);
  }

  return { state, refreshContentInfo };
}
