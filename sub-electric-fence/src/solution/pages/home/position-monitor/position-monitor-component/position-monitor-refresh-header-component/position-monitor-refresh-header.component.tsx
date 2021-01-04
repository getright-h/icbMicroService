import { Button } from 'antd';
import React from 'react';
import style from './position-monitor-refresh-header.component.less';
import { usePositionMonitorRefreshHeaderStore } from './position-monitor-refresh-header.component.store';
import { IPositionMonitorRefreshHeaderProps } from './position-monitor-refresh-header.interface';

export default React.memo((props: IPositionMonitorRefreshHeaderProps) => {
  const { state, resetRefresh } = usePositionMonitorRefreshHeaderStore(props);
  const { refreshTime } = state;
  const { customStyle = {} } = props;
  return (
    <div className={style.contentTitle} style={customStyle}>
      <h1>定位监控</h1>
      {refreshTime && (
        <div className={style.refreshContent}>
          <span className={style.refreshTime}>{refreshTime}s后刷新</span>
          <Button onClick={resetRefresh}>手动刷新</Button>
        </div>
      )}
    </div>
  );
});
