import { prefixActionTypes } from '~/framework/util/common';

export const TYPES = {
  SET_TREE_SELECT_NODE: 'SET_TREE_SELECT_NODE',
  SET_DATA: 'SET_DATA'
};

prefixActionTypes('STOCK_LIST')(TYPES);
