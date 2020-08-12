import { prefixActionTypes } from '~/framework/util/common';

export const TYPES = {
  SET_LAYOUT_LOADING: 'SET_LAYOUT_LOADING',
  SET_COLLAPSED: 'SET_COLLAPSED'
};

prefixActionTypes('GLOBAL')(TYPES);
