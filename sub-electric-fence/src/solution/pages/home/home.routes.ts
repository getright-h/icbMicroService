import { IRoute } from '~framework/interfaces/IRoute';
import { ROUTERS } from '~/solution/shared/constant/routers.const';
const MODULE_PATH = 'home';
export const homeRoutes: IRoute[] = [
  {
    path: `${MODULE_PATH}/fence`,
    component: ROUTERS.electricFenceManage,
    lazyload: true
  },
  {
    path: `${MODULE_PATH}/alarm`,
    component: ROUTERS.alarmManageModule,
    lazyload: true
  },
  {
    path: `${MODULE_PATH}/report`,
    component: ROUTERS.reportManageModule,
    lazyload: true
  },
  {
    path: `${MODULE_PATH}/directive`,
    component: ROUTERS.directiveModule,
    lazyload: true
  }
];
