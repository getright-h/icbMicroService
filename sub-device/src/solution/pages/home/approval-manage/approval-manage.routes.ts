import { IRoute } from '~framework/interfaces/IRoute';
import { ROUTERS } from '~/solution/shared/constant/routers.const';

const MODULE_PATH = 'home/approvalManage';
export const approvalManageRoutes: IRoute[] = [
  {
    path: `${MODULE_PATH}/approvalManage`,
    component: ROUTERS.approvalManage,
    lazyload: true,
    exact: true
  },
  {
    path: `${MODULE_PATH}/approveTemplate`,
    component: ROUTERS.approvalTemplate,
    lazyload: true,
    exact: true
  },
  {
    path: `${MODULE_PATH}/addTemplate/:id`,
    component: ROUTERS.addTemplate,
    lazyload: true,
    exact: true
  }
];
