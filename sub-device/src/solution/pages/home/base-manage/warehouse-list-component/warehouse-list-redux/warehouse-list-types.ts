import { prefixActionTypes } from '~/framework/util/common';

export const TYPES = {
  SET_TREE_SELECT_NODE: 'SET_TREE_SELECT_NODE',
  SET_MODAL_STATE: 'SET_TREE_SELECT_NODE'
};

prefixActionTypes('WAREHOUSE_LIST')(TYPES);
