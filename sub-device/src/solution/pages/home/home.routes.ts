import { IRoute } from '~framework/interfaces/IRoute';
import { ROUTERS } from '~/solution/shared/constant/routers.const';
import { RedirectStrategy } from '~/framework/aop/strategy/redirect.strategy';
const MODULE_PATH = 'home';
export const homeRoutes: IRoute[] = [
  {
    path: `${MODULE_PATH}/baseManage`,
    component: ROUTERS.warehouseManage,
    lazyload: true
  },
  {
    path: `${MODULE_PATH}/stock`,
    component: ROUTERS.stockManageModule,
    lazyload: true
  },
  {
    path: `${MODULE_PATH}/allocation`,
    component: ROUTERS.allocationManageModule,
    lazyload: true
  },
  {
    path: `${MODULE_PATH}/voucher`,
    component: ROUTERS.voucherManageModule,
    lazyload: true
  }
];
