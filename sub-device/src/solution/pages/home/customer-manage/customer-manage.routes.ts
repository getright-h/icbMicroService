import { IRoute } from '~framework/interfaces/IRoute';
import { ROUTERS } from '~/solution/shared/constant/routers.const';

const MODULE_PATH = 'home/customer';
export const customerManageRoutes: IRoute[] = [
  {
    path: `${MODULE_PATH}/owner`,
    component: ROUTERS.ownerManageComponent,
    lazyload: true,
    exact: true
  }
];
