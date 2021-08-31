import { TYPES } from './global.type';
import { MyInfo } from '~/solution/model/dto/home.dto';

// 设置 loading
export function setLoadingAction(payload: boolean) {
  return {
    type: TYPES.SET_LAYOUT_LOADING,
    payload
  };
}

export function setMyInfo(payload: MyInfo) {
  return {
    type: TYPES.SET_MY_INFO,
    payload
  };
}
