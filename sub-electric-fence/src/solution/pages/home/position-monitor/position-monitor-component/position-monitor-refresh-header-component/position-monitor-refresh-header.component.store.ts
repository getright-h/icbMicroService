import {
  IPositionMonitorRefreshHeaderState,
  IPositionMonitorRefreshHeaderProps
} from './position-monitor-refresh-header.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect, useRef } from 'react';

export function usePositionMonitorRefreshHeaderStore(props: IPositionMonitorRefreshHeaderProps) {
  const { state, setStateWrap } = useStateStore(new IPositionMonitorRefreshHeaderState());
  const setIntervalInfo: any = useRef();
  let { refreshTime } = state;
  useEffect(() => {
    setRefreshTime();
    return () => {
      clearInterval(setIntervalInfo.current);
    };
  });
  function setRefreshTime() {
    setIntervalInfo.current = setInterval(() => {
      refreshTime--;
      if (refreshTime <= 0) {
        // 重复计时
        resetRefresh();
      } else {
        setStateWrap({ refreshTime });
      }
    }, 1000);
  }

  function resetRefresh() {
    setStateWrap({ refreshTime: 20 });
    props.refreshContentInfo();
  }
  return { state, resetRefresh };
}
