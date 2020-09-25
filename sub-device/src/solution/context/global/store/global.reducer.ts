import { IAction } from '~/solution/shared/interfaces/common.interface';
import { IBaseGlobalState } from '../global.interface';
import { TYPES } from './global.type';

export const initialState: IBaseGlobalState = {
  layoutLoading: false,
  collapsed: false,
  myInfo: {
    userId: '',
    typeId: 'c59c75eec2d3cc075cca08d84386bcb9',
    systemId: '938880216d89c68eb6ea08d69b143c52'
  }
};

export function reducer(state = initialState, action: IAction<any>) {
  const { type, payload } = action;
  switch (type) {
    case TYPES.SET_LAYOUT_LOADING:
      return {
        ...state,
        layoutLoading: payload
      };
    case TYPES.SET_COLLAPSED:
      return {
        ...state,
        collapsed: !state.collapsed
      };
    case TYPES.SET_MY_INFO:
      return {
        ...state,
        myInfo: {
          userId: payload.id,
          systemId: payload.systemId,
          systemCode: payload.systemCode
        }
      };
    default:
      return state;
  }
}
