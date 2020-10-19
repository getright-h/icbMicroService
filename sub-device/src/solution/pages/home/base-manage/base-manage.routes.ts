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
    path: `${MODULE_PATH}/carTypeSetting`,
    component: ROUTERS.carTypeSetting,
    lazyload: true,
    exact: true
  },
  {
    path: `${MODULE_PATH}/supplierSetting`,
    component: ROUTERS.supplierSetting,
    lazyload: true,
    exact: true
  },
  {
    path: `${MODULE_PATH}/deviceTypeSetting`,
    component: ROUTERS.deviceTypeSetting,
    lazyload: true,
    exact: true
  },
  {
    path: `${MODULE_PATH}/addSupplier`,
    component: ROUTERS.addSupplier,
    lazyload: true,
    exact: true
  }
];
