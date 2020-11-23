import { prefixActionTypes } from '~/framework/util/common';

export const TYPES = {
  SET_LAYOUT_LOADING: 'SET_LAYOUT_LOADING',
  SET_COLLAPSED: 'SET_COLLAPSED',
  SET_MY_INFO: 'SET_MY_INFO'
};

prefixActionTypes('GLOBAL')(TYPES);
