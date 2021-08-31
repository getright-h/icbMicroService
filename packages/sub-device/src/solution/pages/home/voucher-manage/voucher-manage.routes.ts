import { IRoute } from '~framework/interfaces/IRoute';
import { ROUTERS } from '~/solution/shared/constant/routers.const';

const MODULE_PATH = 'home/voucher';
export const voucherManageRoutes: IRoute[] = [
  {
    path: `${MODULE_PATH}/manage`,
    component: ROUTERS.voucherManage,
    lazyload: true,
    exact: true
  }
];
