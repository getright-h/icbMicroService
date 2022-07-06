import { GlobalContext } from '~/solution/context/global/global.provider';
import { IGlobalState } from '~/solution/context/global/global.interface';
import { useLocation, useParams } from 'react-router-dom';
import { isBoolean } from 'lodash';
import React from 'react';
import { DEVICE_AUTHORITY_CODE } from '~shared/constant/authority';
import { MENU_MAP } from '~shared/constant/menu.map';
export function useAuthorityState(): {
  $auth: any;
} {
  const { gState }: IGlobalState = React.useContext(GlobalContext);
  const { pathname } = usePath();
  const { auth = {} } = gState?.myInfo as any;
  let authority = {};
  let authorityCode = {};
  const $auth = {};
  let target = '';
  // 先找一级路由,没找到再去查找对应的子路由
  if (auth[pathname]) {
    target = pathname;
  } else {
    target = subRouterMatch(pathname);
  }
  authority = auth[target] || {};

  if (DEVICE_AUTHORITY_CODE[target]) {
    authorityCode = DEVICE_AUTHORITY_CODE[target];
  }

  for (const key in authorityCode) {
    // 如果当前页面没有权限列表,或者未传递需要校验的权限码,则返回 true
    if (!Object.keys(authority).length || authority[authorityCode[key]] === undefined) $auth[key] = true;

    // 只是针对权限是否是 boolen类型 才对权限进行判断, 否则 返回 true
    if (isBoolean(authority[authorityCode[key]])) {
      $auth[key] = authority[authorityCode[key]];
    } else {
      $auth[key] = true;
    }
  }
  // console.log('$auth', $auth);
  return { $auth };
}
/**
 * 匹配规则
 *
 * 一级路由根据后端返回的规则进行匹配
 * 子路由判断
 * 维护一个hashMap,一级路由作为键,子路由作为数组成为值,将父子路由关联起来
 * 这样子路由就可以查询到一级路由的权限值
 *
 */
function subRouterMatch(pathname: string) {
  let target = '';
  for (const fatherRouter in MENU_MAP) {
    MENU_MAP[fatherRouter].some((subRouter: string) => {
      if (pathname == subRouter) {
        target = fatherRouter;
        return true;
      }
      return false;
    });
  }
  return target;
}

/**
 * 获取当前页面的无参数pathnanme
 *
 * 当前项目路由传值有两种方式
 * 1. 路由动态穿值 /:id/:state 方式
 * 2. query参数方式 ?id=xx&state=xx 方式
 * 第一种方式 可以使用 useParams 获取值, 并且 pathname 包含完整的 url 带有参数
 * 第二种方式 useParams 无法获取参数值,并且 pathname 不带参数, 所以无需对 query传参路由单独处理
 *
 */
export function usePath() {
  const { pathname } = useLocation();
  const params = useParams();

  const _ = pathname.split('/');
  const tag = params[Object.keys(params)[0]];
  const index = _.indexOf(tag);
  if (index !== -1) {
    _.splice(index);
  }
  return {
    pathname: _.join('/')
  };
}
/**
 *
 * @param authority 权限码hash表
 * @param key 需要校验的权限码
 */
export function useAuthorityRender(authority: Record<string, any>, key: string): boolean {
  // 如果当前页面没有权限列表,或者未传递需要校验的权限码,则返回 true
  if (!authority || !Object.keys(authority).length || typeof key != 'string' || !key) return true;

  // 只是针对权限是否是 boolen类型 才对权限进行判断, 否则 返回 true
  if (isBoolean(authority[key])) {
    return authority[key];
  } else {
    return true;
  }
}
