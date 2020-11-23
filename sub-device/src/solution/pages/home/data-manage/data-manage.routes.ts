import { IRoute } from '~framework/interfaces/IRoute';
import { ROUTERS } from '~/solution/shared/constant/routers.const';

const MODULE_PATH = 'home/data';
export const dataManageRoutes: IRoute[] = [
  {
    path: `${MODULE_PATH}/deviceMonitor`,
    component: ROUTERS.deviceMonitor,
    lazyload: true,
    exact: true
  },
  {
    path: `${MODULE_PATH}/deviceLine`,
    component: ROUTERS.deviceLine,
    lazyload: true,
    exact: true
  }
];
