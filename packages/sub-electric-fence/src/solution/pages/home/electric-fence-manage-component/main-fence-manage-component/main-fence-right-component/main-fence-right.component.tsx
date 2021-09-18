import * as React from 'react';
import style from './main-fence-right.component.less';
import { useMainFenceRightStore } from './main-fence-right.component.store';
import { IMainFenceRightProps } from './main-fence-right.interface';

export default function MainFenceRightComponent(props: IMainFenceRightProps) {
  useMainFenceRightStore(props);
  return (
    <div className={style.mapContent}>
      <div id="container" className={style.container}></div>
    </div>
  );
}
