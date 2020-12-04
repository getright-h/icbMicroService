import { data, IPositionMonitorState } from './position-monitor.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect, useRef, Dispatch } from 'react';
import moment from 'moment';
import { setDataAction } from './position-monitor-redux/position-monitor-action';

export function usePositionMonitorStore(dispatch: Dispatch<any>) {
  const { state, setStateWrap } = useStateStore(new IPositionMonitorState());
  const setIntervalInfo: any = useRef();
  useEffect(() => {
    setRefreshTime();
    return () => {
      clearInterval(setIntervalInfo.current);
    };
  }, []);

  function setRefreshTime() {
    setIntervalInfo.current = setInterval(() => {
      // setDataAction({ rightDrawervisible: true }, dispatch);
      setDataAction({ refreshTime: moment().format('h:mm:ss') }, dispatch);
    }, 5000);
  }
  return { state };
}
