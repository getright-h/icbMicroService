import { IRoute } from '~framework/interfaces/IRoute';
import { ROUTERS } from '~/solution/shared/constant/routers.const';
import { RedirectStrategy } from '~/framework/aop/strategy/redirect.strategy';

const MODULE_PATH = 'home/stock';
export const stockManageRoutes: IRoute[] = [
  {
    path: `${MODULE_PATH}/all`,
    component: ROUTERS.stockAll,
    lazyload: true,
    exact: true
  },
  {
    path: `${MODULE_PATH}/in-out`,
    component: ROUTERS.stockInOut,
    lazyload: true,
    exact: true
  },
  {
    path: `${MODULE_PATH}/purchase`,
    component: ROUTERS.purchaseOrder,
    lazyload: true,
    exact: true
  }
];
