import { prefixActionTypes } from '~/framework/util/common';

export const TYPES = {
  ROW_CLICK: 'ROW_CLICK'
};

prefixActionTypes('FENCE_MANAGE')(TYPES);
