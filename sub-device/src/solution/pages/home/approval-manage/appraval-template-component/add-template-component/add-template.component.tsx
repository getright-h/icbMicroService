import * as React from 'react';
import style from './add-template.component.less';
import { useAddTemplateStore } from './add-template.component.store';

export default function AddTemplateComponent() {
  const { state } = useAddTemplateStore();
  return <div className={style.test}>Hello AddTemplateComponent</div>;
}
