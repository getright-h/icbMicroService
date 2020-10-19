import { TYPES } from './appraval-template-types';
import { Dispatch } from 'react';
import { EventDataNode } from 'rc-tree/lib/interface';
export function setTreeSelectNode(payload: EventDataNode, dispatch: Dispatch<any>) {
  return dispatch({
    type: TYPES.SET_TREE_SELECT_NODE,
    payload
  });
}
