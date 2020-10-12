import { IRoute } from '~framework/interfaces/IRoute';
import { ROUTERS } from '~/solution/shared/constant/routers.const';

const MODULE_PATH = 'home/allocation';
export const allocationManageRoutes: IRoute[] = [
  {
    path: `${MODULE_PATH}/manage`,
    component: ROUTERS.allocationManage,
    lazyload: true,
    exact: true
  },
  {
    path: `${MODULE_PATH}/createAllocation`,
    component: ROUTERS.createAllocation,
    lazyload: true,
    exact: true
  },
  {
    path: `${MODULE_PATH}/editAllocation/:id`,
    component: ROUTERS.createAllocation,
    lazyload: true,
    exact: true
  },
  {
    path: `${MODULE_PATH}/allocationDetail/:id`,
    component: ROUTERS.allocationDetail,
    lazyload: true,
    exact: true
  },
  {
    path: `${MODULE_PATH}/process`,
    component: ROUTERS.allocationProcess,
    lazyload: true,
    exact: true
  },
  {
    path: `${MODULE_PATH}/initDetail/:id`,
    component: ROUTERS.initDetail,
    lazyload: true,
    exact: true
  },
  {
    path: `${MODULE_PATH}/receiveDetail/:id`,
    component: ROUTERS.receiveDetail,
    lazyload: true,
    exact: true
  },
  {
    path: `${MODULE_PATH}/template`,
    component: ROUTERS.allocationTemplate,
    lazyload: true,
    exact: true
  },
  {
    path: `${MODULE_PATH}/templateEdit`,
    component: ROUTERS.templateEdit,
    lazyload: true,
    exact: true
  },
  {
    path: `${MODULE_PATH}/templateEdit/:id`,
    component: ROUTERS.templateEdit,
    lazyload: true,
    exact: true
  },
  {
    path: `${MODULE_PATH}/templateDetail/:id`,
    component: ROUTERS.templateDetail,
    lazyload: true,
    exact: true
  }
];
