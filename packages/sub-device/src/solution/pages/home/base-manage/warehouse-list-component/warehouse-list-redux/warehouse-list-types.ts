import { prefixActionTypes } from '~/framework/util/common';

export const TYPES = {
  SET_TREE_SELECT_NODE: 'SET_TREE_SELECT_NODE',
  SET_WAREHOUSE_MODAL_STATE: 'SET_WAREHOUSE_MODAL_STATE'
};

prefixActionTypes('WAREHOUSE_LIST')(TYPES);
