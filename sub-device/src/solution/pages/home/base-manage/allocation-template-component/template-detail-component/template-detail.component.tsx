import * as React from 'react';
import style from './template-detail.component.less';
import { useTemplateDetailStore } from './template-detail.component.store';

export default function TemplateDetailComponent() {
  const { state } = useTemplateDetailStore();
  return <div className={style.test}>Hello TemplateDetailComponent</div>;
}
