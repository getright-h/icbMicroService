import { EventDataNode } from 'antd/lib/tree';
import { Dispatch } from 'react';
import { TYPES } from './stock-list-types';

export function setTreeSelectNode(payload: EventDataNode, dispatch: Dispatch<any>) {
  return dispatch({
    type: TYPES.SET_TREE_SELECT_NODE,
    payload
  });
}
