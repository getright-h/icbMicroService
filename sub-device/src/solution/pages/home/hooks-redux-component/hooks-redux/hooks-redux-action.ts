import { TYPES } from './hooks-redux-types';
import { Dispatch } from 'react';
export function onClickAction(dispatch: Dispatch<any>) {
  return dispatch({
    type: TYPES.ROW_CLICK
  });
}
