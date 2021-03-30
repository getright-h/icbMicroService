import { IAction } from '~/solution/shared/interfaces/common.interface';
import { TYPES } from './appraval-template-types';
import { EventDataNode } from 'antd/lib/tree';
export interface IcurrentSelectNode {
  isAll: boolean;
  node: EventDataNode;
}
export const appravalTemplateInitialState: {
  currentSelectNode: IcurrentSelectNode;
} = {
  currentSelectNode: { isAll: true, node: undefined }
};

export function AppravalTemplateReducer(state = appravalTemplateInitialState, action: IAction<any>) {
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
