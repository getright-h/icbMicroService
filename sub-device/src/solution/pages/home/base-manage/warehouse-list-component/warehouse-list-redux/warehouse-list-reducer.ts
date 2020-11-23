import { EventDataNode } from 'antd/lib/tree';
import { IAction } from '~/solution/shared/interfaces/common.interface';
import { TYPES } from './warehouse-list-types';

export const warehouseListInitialState: {
  currentSelectNode: EventDataNode;
} = {
  currentSelectNode: undefined
};

export function WarehouseListReducer(state = warehouseListInitialState, action: IAction<any>) {
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
