import { IRoute } from '~framework/interfaces/IRoute';
import { ROUTERS } from '~/solution/shared/constant/routers.const';
const MODULE_PATH = 'home';
export const homeRoutes: IRoute[] = [
  {
    path: MODULE_PATH,
    component: ROUTERS.electricFenceManage,
    lazyload: true
  }
];
