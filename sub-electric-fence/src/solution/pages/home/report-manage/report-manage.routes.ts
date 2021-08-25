import { IRoute } from '~framework/interfaces/IRoute';
import { ROUTERS } from '~/solution/shared/constant/routers.const';

const MODULE_PATH = 'home/report';
export const reportManageRoutes: IRoute[] = [
  {
    path: `${MODULE_PATH}/statistical`,
    component: ROUTERS.statisticalListComponent,
    lazyload: true,
    exact: true
  },
  {
    path: `${MODULE_PATH}/statistical/detail/:deviceCode/:alarmType`,
    component: ROUTERS.statisticalDetailComponent,
    lazyload: true,
    exact: true
  },
  {
    path: `${MODULE_PATH}/record`,
    component: ROUTERS.recordListComponent,
    lazyload: true,
    exact: true
  },
  {
    path: `${MODULE_PATH}/follow`,
    component: ROUTERS.followComponent,
    lazyload: true,
    exact: true
  },
  {
    path: `${MODULE_PATH}/monitor`,
    component: ROUTERS.monitorComponent,
    lazyload: true,
    exact: true
  },
  // {
  //   path: `${MODULE_PATH}/odometer`,
  //   component: ROUTERS.odometerListComponent,
  //   lazyload: true,
  //   exact: true
  // }, // 里程
  {
    path: `${MODULE_PATH}/state`,
    component: ROUTERS.stateListComponent,
    lazyload: true,
    exact: true
  }, // 设备状态
  {
    path: `${MODULE_PATH}/offline`,
    component: ROUTERS.offlineListComponent,
    lazyload: true,
    exact: true
  }, // 离线设备
  // {
  //   path: `${MODULE_PATH}/dwell`,
  //   component: ROUTERS.dwellListComponent,
  //   lazyload: true,
  //   exact: true
  // }, // 停留
  {
    path: `${MODULE_PATH}/permanent`,
    component: ROUTERS.permanentListComponent,
    lazyload: true,
    exact: true
  },
  {
    path: `${MODULE_PATH}/userActionReport`,
    component: ROUTERS.userActionReport,
    lazyload: true,
    exact: true
  },
  {
    path: `${MODULE_PATH}/userActionReport/:searchKey`,
    component: ROUTERS.userActionReport,
    lazyload: true,
    exact: true
  }
];
