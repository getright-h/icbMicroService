import * as React from 'react';
import style from './position-monitor-mapbtn-driving-line.component.less';
import { usePositionMonitorMapbtnDrivingLineStore } from './position-monitor-mapbtn-driving-line.component.store';

export default function PositionMonitorMapbtnDrivingLineComponent() {
  const { state } = usePositionMonitorMapbtnDrivingLineStore();
  return <div className={style.test}>Hello PositionMonitorMapbtnDrivingLineComponent</div>;
}
