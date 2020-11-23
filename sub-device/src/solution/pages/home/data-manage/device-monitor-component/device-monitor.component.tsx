import * as React from 'react';
import style from './device-monitor.component.less';
import { useDeviceMonitorStore } from './device-monitor.component.store';

export default function DeviceMonitorComponent() {
  const { state } = useDeviceMonitorStore();
  return <div className={style.test}>Hello DeviceMonitorComponent</div>;
}
