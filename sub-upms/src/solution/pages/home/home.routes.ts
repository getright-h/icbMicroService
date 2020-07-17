import { IRoute } from '~framework/interfaces/IRoute';
import { ROUTERS } from '~/solution/shared/constant/routers.const';
import { RedirectStrategy } from '~/framework/aop/strategy/redirect.strategy';
const MODULE_PATH = 'account/';
export const homeRoutes: IRoute[] = [
  {
    path: MODULE_PATH,
    component: ROUTERS.organizationManage,
    strategy: RedirectStrategy(`${MODULE_PATH}organizationManage`),
    lazyload: true,
    exact: true
  },
  {
    path: MODULE_PATH + 'organizationManage',
    component: ROUTERS.organizationManage,
    lazyload: true,
    exact: true
  },
  {
    path: MODULE_PATH + 'userManage',
    component: ROUTERS.userManageModule,
    lazyload: true
  }
];
