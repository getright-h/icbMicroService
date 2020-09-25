import { TYPES } from './warehouse-list-types';
import { Dispatch } from 'react';
import { EventDataNode } from 'antd/lib/tree';
export function setTreeSelectNode(payload: EventDataNode, dispatch: Dispatch<any>) {
  return dispatch({
    type: TYPES.SET_TREE_SELECT_NODE,
    payload
  });
}

export function setModalvisible(payload: { modal: string; value: boolean }, dispatch: Dispatch<any>) {
  return dispatch({
    type: TYPES.SET_MODAL_STATE,
    payload
  });
}
