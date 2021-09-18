import { prefixActionTypes } from '~/framework/util/common';

export const TYPES = {
  ROW_CLICK: 'ROW_CLICK',
  SET_MODALVISIBLE: 'SET_MODALVISIBLE',
  NEW_FENCE: 'NEW_FENCE',
  EDIT_FENCE: 'EDIT_FENCE',
  TABLE_INFO: 'TABLE_INFO',
  SET_TABLE_INFO: 'SET_TABLE_INFO',
  SET_SEARCH_FORM: 'SET_SEARCH_FORM'
};

prefixActionTypes('FENCE_MANAGE')(TYPES);
