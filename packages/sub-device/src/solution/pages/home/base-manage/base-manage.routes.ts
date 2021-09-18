import { IRoute } from '~framework/interfaces/IRoute';
import { ROUTERS } from '~/solution/shared/constant/routers.const';

const MODULE_PATH = 'home/baseManage';
export const baseManageRoutes: IRoute[] = [
  {
    path: `${MODULE_PATH}/warehouse`,
    component: ROUTERS.warehouseList,
    lazyload: true,
    exact: true
  },
  {
    path: `${MODULE_PATH}/addAndEditAllocationTemplate`,
    component: ROUTERS.addOrEditallocationTemplate,
    lazyload: true,
    exact: false
  },
  {
    path: `${MODULE_PATH}/deviceTypeSetting`,
    component: ROUTERS.deviceTypeSetting,
    lazyload: true,
    exact: true
  }
];
