import * as React from 'react';
import style from './hooks-redux.component.less';
import { HooksReduxReducer, hooksReduxInitialState } from './hooks-redux/hooks-redux-reducer';
import { onClickAction } from './hooks-redux/hooks-redux-action';
import ChildComponent from './child-component/child.component';
export const HooksReduxManageContext = React.createContext({
  reduxState: hooksReduxInitialState,
  dispatch: undefined
});
export default function HooksReduxComponent() {
  // hooksReduxState 当前hooks state

  const [hooksReduxState, dispatch] = React.useReducer(HooksReduxReducer, hooksReduxInitialState);
  const { count } = hooksReduxState;
  return (
    <HooksReduxManageContext.Provider value={{ reduxState: hooksReduxState, dispatch }}>
      <div className={style.test} onClick={() => onClickAction(dispatch)}>
        {count}
      </div>
      <ChildComponent></ChildComponent>
    </HooksReduxManageContext.Provider>
  );
}
