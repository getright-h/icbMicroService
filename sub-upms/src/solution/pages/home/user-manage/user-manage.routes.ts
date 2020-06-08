import { IRoute } from '~framework/interfaces/IRoute';
import { ROUTERS } from '~/solution/shared/constant/routers.const';

const MODULE_PATH = 'account/userManage/';
export const userManageRoutes: IRoute[] = [
  {
    path: MODULE_PATH + 'main',
    component: ROUTERS.userManage,
    lazyload: true
  },
  {
    path: MODULE_PATH + 'roleManage',
    component: ROUTERS.roleManage,
    lazyload: true
  },
  {
    path: MODULE_PATH + 'stationManage',
    component: ROUTERS.stationManage,
    lazyload: true
  },
  {
    path: MODULE_PATH + 'departmentManage',
    component: ROUTERS.departmentManage,
    lazyload: true
  }
];
