import * as React from 'react';
import style from './approval-manage.component.less';
import { useApprovalManageStore } from './approval-manage.component.store';

export default function ApprovalManageComponent() {
  const { state } = useApprovalManageStore();
  return <div className={style.test}>Hello ApprovalManageComponent</div>;
}
