import * as React from 'react';
import style from './position-monitor.component.less';
import { usePositionMonitorStore } from './position-monitor.component.store';

export default function PositionMonitorComponent() {
  const { state } = usePositionMonitorStore();
  return <div className={style.test}>Hello PositionMonitorComponent</div>;
}
