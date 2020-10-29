import { prefixActionTypes } from '~/framework/util/common';

export const TYPES = {
  SET_FORM_INFO: 'SET_FORM_INFO',
  SET_FLOWNODE_SETTING_FIELD: 'SET_FLOWNODE_SETTING_FIELD',
  SET_CURRENT_SELECT_ITEM: 'SET_CURRENT_SELECT_ITEM',
  SET_CURRENT_PARAMS: 'SET_CURRENT_PARAMS'
};

prefixActionTypes('ADD_TEMPLATE')(TYPES);
