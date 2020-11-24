import * as React from 'react';
import style from './position-monitor-right.component.less';
import { usePositionMonitorRightStore } from './position-monitor-right.component.store';

export default function PositionMonitorRightComponent() {
  const { state } = usePositionMonitorRightStore();
  return <div className={style.test}>Hello PositionMonitorRightComponent</div>;
}
