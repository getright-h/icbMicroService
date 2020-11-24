import { EventDataNode } from 'antd/lib/tree';
import { IAction } from '~/solution/shared/interfaces/common.interface';
import { TYPES } from './position-monitor-types';

export const positionMonitorInitialState: {
  currentSelectNode: EventDataNode;
} = {
  currentSelectNode: undefined
};

export function PositionMonitorReducer(state = positionMonitorInitialState, action: IAction<any>) {
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
