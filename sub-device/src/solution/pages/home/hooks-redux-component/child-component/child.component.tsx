import * as React from 'react';
import style from './child.component.less';
import { HooksReduxManageContext } from '../hooks-redux.component';
import { Button } from 'antd';
import { onClickAction } from '../hooks-redux/hooks-redux-action';

export default function ChildComponent() {
  const { reduxState, dispatch } = React.useContext(HooksReduxManageContext);
  const { count } = reduxState;
  return (
    <div>
      <div className={style.test}>{count}</div>
      <Button type="primary" onClick={() => onClickAction(dispatch)}>
        点击添加
      </Button>
    </div>
  );
}
