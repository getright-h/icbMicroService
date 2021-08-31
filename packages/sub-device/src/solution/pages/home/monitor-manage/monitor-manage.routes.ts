import { IRoute } from '~framework/interfaces/IRoute';
import { ROUTERS } from '~/solution/shared/constant/routers.const';

const MODULE_PATH = 'home/monitor';
export const monitorManageRoutes: IRoute[] = [
  {
    path: `${MODULE_PATH}/monitorManage`,
    component: ROUTERS.monitorManage,
    lazyload: true,
    exact: true
  }
];
