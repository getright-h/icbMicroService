import React from 'react';
import style from './i-header-title.component.less';
import { IIHeaderTitleState } from './i-header-title.interface';
export default function IHeaderTitleComponent(props: IIHeaderTitleState) {
  return (
    <div className={[style.contentTitle, props.className ? style[props.className] : ''].join(' ')}>
      <h1>{props.pageName}</h1>
      {props.children}
    </div>
  );
}
