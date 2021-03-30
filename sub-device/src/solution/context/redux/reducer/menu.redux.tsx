import TYPES from '../types';
import { MenuState } from './reducer.interface';
import { IMenu } from '~/framework/components/menu-component/menu.interface';

export const initialState: MenuState = {
  menuList: new Array<IMenu>()
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
