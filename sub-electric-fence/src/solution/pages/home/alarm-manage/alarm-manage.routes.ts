import { IRoute } from '~framework/interfaces/IRoute';
import { ROUTERS } from '~/solution/shared/constant/routers.const';

const MODULE_PATH = 'home/alarm';
export const alarmManageRoutes: IRoute[] = [
  {
    path: `${MODULE_PATH}/parameter`,
    component: ROUTERS.alarmParameter,
    lazyload: true,
    exact: true
  },
  {
    path: `${MODULE_PATH}/config`,
    component: ROUTERS.alarmConfig,
    lazyload: true
  }
];
