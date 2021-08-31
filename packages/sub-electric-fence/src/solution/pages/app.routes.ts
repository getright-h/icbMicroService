import { IRoute } from '~framework/interfaces/IRoute';
import { ROUTERS } from '~/solution/shared/constant/routers.const';
export const appRoutes: IRoute[] = [
  {
    path: 'home',
    component: ROUTERS.home,
    lazyload: true
  },

  {
    path: 'userActionReport',
    component: ROUTERS.userActionReport,
    lazyload: true
  },
  {
    path: '',
    component: ROUTERS.login,
    lazyload: true
  }
];
