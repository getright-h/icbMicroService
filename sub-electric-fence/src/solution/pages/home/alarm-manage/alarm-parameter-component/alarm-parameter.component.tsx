import * as React from 'react';
import style from './alarm-parameter.component.less';
import { useAlarmParameterStore } from './alarm-parameter.component.store';

export default function AlarmParameterComponent() {
  const { state } = useAlarmParameterStore();
  return <div className={style.test}>Hello AlarmParameterComponent</div>;
}
