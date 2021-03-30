import { IAction } from '~/solution/shared/interfaces/common.interface';
import { IState } from '../login.interface';
import { TYPES } from './type';

export const initialState: IState = {
  loginLoading: false,
  vCodeImage: '',
  errorMsg: ''
};

export function reducer(state = initialState, action: IAction<any>) {
  const { type, payload } = action;
  switch (type) {
    case TYPES.SET_LOADING_LOADING:
      return {
        ...state,
        loginLoading: payload
      };
    case TYPES.SET_V_CODE:
      return {
        ...state,
        vCodeImage: payload
      };
    case TYPES.SET_ERROR_MESSAGE:
      return {
        ...state,
        errorMsg: payload
      };
    default:
      return state;
  }
}
