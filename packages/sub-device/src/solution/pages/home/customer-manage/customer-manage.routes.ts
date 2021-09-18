import { IRoute } from '~framework/interfaces/IRoute';
import { ROUTERS } from '~/solution/shared/constant/routers.const';

const MODULE_PATH = 'home/customer';
export const customerManageRoutes: IRoute[] = [
  {
    path: `${MODULE_PATH}/owner`,
    component: ROUTERS.ownerManageComponent,
    lazyload: true,
    exact: true
  },
  {
    path: `${MODULE_PATH}/vehicle`,
    component: ROUTERS.vehicleManageComponent,
    lazyload: true,
    exact: true
  },
  {
    path: `${MODULE_PATH}/addVehicle`,
    component: ROUTERS.editVehicle,
    lazyload: true,
    exact: true
  },
  {
    path: `${MODULE_PATH}/editVehicle/:id`,
    component: ROUTERS.editVehicle,
    lazyload: true,
    exact: true
  },
  {
    path: `${MODULE_PATH}/vehicleDetail/:id`,
    component: ROUTERS.vehicleDetail,
    lazyload: true,
    exact: true
  }
];
