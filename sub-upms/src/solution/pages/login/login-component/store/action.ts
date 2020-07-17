import { TYPES } from './type';

// 设置 loading
export function setLoadingAction(payload: boolean) {
  return {
    type: TYPES.SET_LOADING_LOADING,
    payload
  };
}

// 设置 验证码
export function setVcode(payload: string) {
  return {
    type: TYPES.SET_V_CODE,
    payload
  };
}
