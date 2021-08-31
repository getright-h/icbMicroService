import { prefixActionTypes } from '~/framework/util/common';

export const TYPES = {
  SET_LOADING_LOADING: 'SET_LOADING_LOADING',
  SET_V_CODE: 'SET_V_CODE'
};

prefixActionTypes('LOGIN')(TYPES);
