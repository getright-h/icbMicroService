import TYPES from '../types';
import { MenuState } from './reducer.interface';
import { IMenu } from '~/solution/components/base/menu-component/menu.interface';

export const initialState: MenuState | any = {
  menuList: 1
};

const menuReducer = (state = {}, action: { type: string; payload: any }) => {
  const { type, payload } = action;
  switch (type) {
    case TYPES.SET_MENU:
      return {
        ...state,
        menuList: payload
      };
    default:
      return state;
  }
};

export default menuReducer;
