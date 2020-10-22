import { IRoute } from '~framework/interfaces/IRoute';
import { ROUTERS } from '~/solution/shared/constant/routers.const';
const MODULE_PATH = 'home';
export const homeRoutes: IRoute[] = [
  {
    path: `${MODULE_PATH}/baseManage`,
    component: ROUTERS.warehouseManage,
    lazyload: true
  },
  {
    path: `${MODULE_PATH}/stock`,
    component: ROUTERS.stockManageModule,
    lazyload: true
  },
  {
    path: `${MODULE_PATH}/allocation`,
    component: ROUTERS.allocationManageModule,
    lazyload: true
  },
  {
    path: `${MODULE_PATH}/approvalManage`,
    component: ROUTERS.approvalManageModule
  },
  {
    path: `${MODULE_PATH}/data`,
    component: ROUTERS.dataManagModule,
    lazyload: true
  },
  {
    path: `${MODULE_PATH}/monitor`,
    component: ROUTERS.monitorManagModule,
    lazyload: true
  }
];
