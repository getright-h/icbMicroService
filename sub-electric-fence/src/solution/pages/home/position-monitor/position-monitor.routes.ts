import { IRoute } from '~framework/interfaces/IRoute';
import { ROUTERS } from '~/solution/shared/constant/routers.const';

const MODULE_PATH = 'home/positionMonitor';
export const positionMonitorRoutes: IRoute[] = [
  {
    path: `${MODULE_PATH}`,
    component: ROUTERS.positionMonitor,
    lazyload: true,
    exact: true
  }
];
