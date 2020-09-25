import { EventDataNode } from 'antd/lib/tree';
import { IAction } from '~/solution/shared/interfaces/common.interface';
import { TYPES } from './warehouse-list-types';

export const warehouseListInitialState: {
  currentSelectNode: EventDataNode;
  addWarehousevisible: boolean;
  addShippingSpaceVisible: boolean;
} = {
  currentSelectNode: undefined,
  addWarehousevisible: false,
  addShippingSpaceVisible: false
};

export function WarehouseListReducer(state = warehouseListInitialState, action: IAction<any>) {
  const { type, payload } = action;
  switch (type) {
    case TYPES.SET_TREE_SELECT_NODE:
      return {
        ...state,
        currentSelectNode: payload
      };
    case TYPES.SET_MODAL_STATE:
      return {
        ...state,
        [payload.modal]: payload.value
      };
    default:
      return state;
  }
}
