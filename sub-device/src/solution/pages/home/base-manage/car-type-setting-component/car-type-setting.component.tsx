import * as React from 'react';
import style from './car-type-setting.component.less';
import { useCarTypeSettingStore } from './car-type-setting.component.store';

export default function CarTypeSettingComponent() {
  const { state } = useCarTypeSettingStore();
  return <div className={style.test}>Hello CarTypeSettingComponent</div>;
}
