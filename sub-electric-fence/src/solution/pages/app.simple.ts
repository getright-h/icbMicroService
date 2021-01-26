import { IRoute } from '~framework/interfaces/IRoute';
import { ROUTERS } from '~/solution/shared/constant/routers.const';
export const appSimpleRoutes: IRoute[] = [
  {
    path: '',
    component: ROUTERS.userActionReport,
    lazyload: true
  }
];
