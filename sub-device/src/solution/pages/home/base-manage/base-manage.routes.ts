import { IRoute } from '~framework/interfaces/IRoute';
import { ROUTERS } from '~/solution/shared/constant/routers.const';

const MODULE_PATH = 'home/baseManage';
export const baseManageRoutes: IRoute[] = [
  {
    path: `${MODULE_PATH}/warehouse`,
    component: ROUTERS.warehouseList,
    lazyload: true,
    exact: true
  }
];
