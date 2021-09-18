import { prefixActionTypes } from '~/framework/util/common';

export const TYPES = {
  SET_LOADING_LOADING: 'SET_LOADING_LOADING',
  SET_V_CODE: 'SET_V_CODE',
  SET_ERROR_MESSAGE: 'SET_ERROR_MESSAGE'
};

prefixActionTypes('LOGIN')(TYPES);
