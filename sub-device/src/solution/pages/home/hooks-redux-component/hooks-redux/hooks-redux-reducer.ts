import { IAction } from '~/solution/shared/interfaces/common.interface';
import { TYPES } from './hooks-redux-types';

export const hooksReduxInitialState = {
  count: 1
};

export function HooksReduxReducer(state = hooksReduxInitialState, action: IAction<any>) {
  const { type, payload } = action;
  switch (type) {
    case TYPES.ROW_CLICK:
      return {
        ...state,
        count: state.count + 1
      };
    default:
      return state;
  }
}
