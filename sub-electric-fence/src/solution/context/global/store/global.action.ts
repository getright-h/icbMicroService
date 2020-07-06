import { TYPES } from './global.type';

// 设置 loading
export function setLoadingAction(payload: boolean) {
  return {
    type: TYPES.SET_LAYOUT_LOADING,
    payload
  };
}
