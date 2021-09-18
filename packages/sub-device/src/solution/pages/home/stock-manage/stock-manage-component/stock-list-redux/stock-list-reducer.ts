import { EventDataNode } from 'antd/lib/tree';
import { IAction } from '~/solution/shared/interfaces/common.interface';
import { TYPES } from './stock-list-types';

export const stockListInitialState: {
  currentSelectNode: EventDataNode;
} = {
  currentSelectNode: undefined
};

export function StockListReducer(state = stockListInitialState, action: IAction<any>) {
  const { type, payload } = action;
  switch (type) {
    case TYPES.SET_TREE_SELECT_NODE:
      return {
        ...state,
        currentSelectNode: payload
      };
    default:
      return state;
  }
}
