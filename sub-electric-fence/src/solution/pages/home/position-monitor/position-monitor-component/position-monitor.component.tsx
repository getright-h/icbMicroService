import * as React from 'react';
import style from './position-monitor.component.less';
import { usePositionMonitorStore } from './position-monitor.component.store';
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
  return (
    <PositionMonitorContext.Provider value={{ reduxState: positionMonitorData, dispatch }}>
      <div>
        <div>{RenderPositionMonitorLeftComponent()}</div>
        <div>{RenderPositionMonitorRightComponent()}</div>
      </div>
    </PositionMonitorContext.Provider>
  );
}
