import { IRoute } from '~framework/interfaces/IRoute';
import { ROUTERS } from '~/solution/shared/constant/routers.const';
import { RedirectStrategy } from '~/framework/aop/strategy/redirect.strategy';
export const appRoutes: IRoute[] = [
  {
    path: 'home',
    component: ROUTERS.home,
    lazyload: true
    // exact: true
  },
  {
    path: 'login',
    component: ROUTERS.login,
    lazyload: true,
    exact: true
  }
];
