import * as React from 'react';
import style from './alarm-config.component.less';
import { useAlarmConfigStore } from './alarm-config.component.store';

export default function AlarmConfigComponent() {
  const { state } = useAlarmConfigStore();
  return <div className={style.test}>Hello AlarmConfigComponent</div>;
}
