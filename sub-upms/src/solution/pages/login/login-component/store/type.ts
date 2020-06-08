import { prefixActionTypes } from '~/framework/util/common';

export const TYPES = {
  SET_LOADING_LOADING: 'SET_LOADING_LOADING'
};

prefixActionTypes('LOGIN')(TYPES);
