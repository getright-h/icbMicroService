import {
  IPositionMonitorRefreshHeaderState,
  IPositionMonitorRefreshHeaderProps
} from './position-monitor-refresh-header.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect, useRef } from 'react';

export function usePositionMonitorRefreshHeaderStore(props: IPositionMonitorRefreshHeaderProps) {
  const { state, setStateWrap } = useStateStore(new IPositionMonitorRefreshHeaderState());
  const setIntervalInfo: any = useRef();
  const { sentTime = 20, stopTime } = props;
  let { refreshTime } = state;
  useEffect(() => {
    setStateWrap({ refreshTime: sentTime });
  }, []);

  useEffect(() => {
    // 用来暂停时间
    // if (!stopTime) {
    //   setRefreshTime();
    // }

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
    setStateWrap({ refreshTime: sentTime });
    props.refreshContentInfo();
  }
  return { state, resetRefresh };
}
