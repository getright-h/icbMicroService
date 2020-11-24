import * as React from 'react';
import style from './position-monitor.component.less';
import PositionMonitorLeftComponent from './position-monitor-left-component/position-monitor-left.component';
import PositionMonitorRightComponent from './position-monitor-right-component/position-monitor-right.component';
import { positionMonitorInitialState, PositionMonitorReducer } from './position-monitor-redux/position-monitor-reducer';
export const PositionMonitorContext = React.createContext({
  reduxState: positionMonitorInitialState,
  dispatch: undefined
});
export default function PositionMonitorComponent() {
  const [positionMonitorData, dispatch] = React.useReducer(PositionMonitorReducer, positionMonitorInitialState);
  const RenderPositionMonitorLeftComponent = React.useCallback(PositionMonitorLeftComponent, []);
  const RenderPositionMonitorRightComponent = React.useCallback(PositionMonitorRightComponent, []);

  function renderSubHeader() {
    return (
      <div className={style.contentTitle}>
        <h1>定位监控</h1>
      </div>
    );
  }
  return (
    <PositionMonitorContext.Provider value={{ reduxState: positionMonitorData, dispatch }}>
      {renderSubHeader()}
      <div className={style.positionMonitor}>
        <div className={style.positionMonitorLeft}>
          <RenderPositionMonitorLeftComponent />
        </div>
        <div className={style.positionMonitorRight}>
          <RenderPositionMonitorRightComponent />
        </div>
      </div>
    </PositionMonitorContext.Provider>
  );
}
