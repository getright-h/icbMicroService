import React from 'react';
import style from './fence-modal-view.component.less';
import { useFenceModalViewStore } from './fence-modal-view.component.store';
import { Button } from 'antd';

export default function FenceModalViewComponent() {
  const { state, startRule } = useFenceModalViewStore();
  const { isRule } = state;
  return (
    <div className={style.mapContent}>
      <div id="container" className={style.container}></div>
      <Button className={`${style.info} ${style.floatRight}`} onClick={startRule}>
        {isRule ? '关闭' : '测距'}
      </Button>
    </div>
  );
}
