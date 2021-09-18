import { TYPES } from './warehouse-list-types';
import { Dispatch } from 'react';
import { EventDataNode } from 'antd/lib/tree';
export function setTreeSelectNode(payload: EventDataNode, dispatch: Dispatch<any>) {
  return dispatch({
    type: TYPES.SET_TREE_SELECT_NODE,
    payload
  });
}

export function openOrCloseAddWarehouseModal(
  payload: { isEditAddWarehouseModal: boolean; editAddWarehouseModalId: string; addWarehousevisible: boolean },
  dispatch: Dispatch<any>
) {
  return dispatch({
    type: TYPES.SET_WAREHOUSE_MODAL_STATE,
    payload
  });
}

export function openOrCloseShippingSpaceModal(
  payload: { isShippingSpaceModal: boolean; editAddWarehouseModalId: string; addWarehousevisible: boolean },
  dispatch: Dispatch<any>
) {
  return dispatch({
    type: TYPES.SET_WAREHOUSE_MODAL_STATE,
    payload
  });
}
