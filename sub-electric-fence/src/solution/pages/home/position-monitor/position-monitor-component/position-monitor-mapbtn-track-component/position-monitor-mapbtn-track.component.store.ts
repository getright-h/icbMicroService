import { IPositionMonitorMapbtnTrackState } from './position-monitor-mapbtn-track.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect, useRef } from 'react';
import moment from 'moment';
import { PositionMonitorContext } from '../position-monitor.component';
export function usePositionMonitorMapbtnTrackStore() {
  const { state, setStateWrap, getState } = useStateStore(new IPositionMonitorMapbtnTrackState());
  const { reduxState, dispatch } = React.useContext(PositionMonitorContext);
  const setIntervalInfo: any = useRef();
  const { currentDoActionCarInfo } = reduxState;
  const { carLine } = state;
  useEffect(() => {
    setRefreshTime();
    return () => {
      clearInterval(setIntervalInfo.current);
    };
  }, []);

  useEffect(() => {
    console.log('currentDoActionCarInfo', currentDoActionCarInfo);
  }, [currentDoActionCarInfo]);

  function setRefreshTime() {
    setIntervalInfo.current = setInterval(() => {
      // setDataAction({ rightDrawervisible: true }, dispatch);
      const info = [
        getState().carLine[getState().carLine.length - 1][0] + 0.0001223,
        getState().carLine[getState().carLine.length - 1][1] + 0.0001112
      ];

      setStateWrap({ refreshTime: moment().format('h:mm:ss'), carLine: [...getState().carLine, info] });
    }, 5000);
  }
  return { state };
}
