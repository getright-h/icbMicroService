import { IRoute } from '~framework/interfaces/IRoute';
import { ROUTERS } from '~/solution/shared/constant/routers.const';
import { RedirectStrategy } from '~/framework/aop/strategy/redirect.strategy';
const MODULE_PATH = 'home/';
export const homeRoutes: IRoute[] = [
  {
    path: MODULE_PATH,
    component: ROUTERS.demo,
    strategy: RedirectStrategy(`${MODULE_PATH}demo`),
    lazyload: true,
    exact: true
  },
  {
    path: MODULE_PATH + 'demo',
    component: ROUTERS.demo,
    lazyload: true,
    exact: true
  },
  {
    path: MODULE_PATH + 'reduxHooks',
    component: ROUTERS.reduxHooks,
    lazyload: true,
    exact: true
  }
];
