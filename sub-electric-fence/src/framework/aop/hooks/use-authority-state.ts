import { GlobalContext } from '~/solution/context/global/global.provider';
import { IGlobalState } from '~/solution/context/global/global.interface';
import { useLocation } from 'react-router-dom';
import { isBoolean } from 'lodash';

export function useAuthorityState() {
  const { gState }: IGlobalState = React.useContext(GlobalContext);
  const { pathname } = useLocation();
  const { auth = {} } = gState?.myInfo as any;
  console.log(auth, pathname);
  let authority = {};
  if (auth[pathname]) {
    authority = auth[pathname];
  }
  return {
    authority
  };
}

/**
 *
 * @param authority 权限码hash表
 * @param key 需要校验的权限码
 */
export function authorityRender(authority: Record<string, any>, key: string): boolean {
  // 如果当前页面没有权限列表,或者未传递需要校验的权限码,则返回 true
  if (!Object.keys(authority).length || typeof key != 'string' || !key) return true;
  // 只是针对权限是否是 boolen类型 才对权限进行判断, 否则 返回 true
  if (isBoolean(authority[key])) {
    return authority[key];
  } else {
    return true;
  }
}
