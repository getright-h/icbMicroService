import { IRoute } from '~framework/interfaces/IRoute';
import { ROUTERS } from '~/solution/shared/constant/routers.const';
const MODULE_PATH = 'account/';
export const homeRoutes: IRoute[] = [
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
