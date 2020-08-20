import * as React from 'react';
import style from './detail.component.less';
import { useDetailStore } from './detail.component.store';

export default function DetailComponent() {
  const { state } = useDetailStore();
  return <div className={style.test}>Hello DetailComponent</div>;
}
