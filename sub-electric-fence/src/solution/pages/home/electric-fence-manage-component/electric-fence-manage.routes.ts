import { IRoute } from '~framework/interfaces/IRoute';
import { ROUTERS } from '~/solution/shared/constant/routers.const';

// const MODULE_PATH = '/home/electric-fence-manage-component/electric-fence-manage';
const MODULE_PATH = 'home';
export const electricFenceManageRoutes: IRoute[] = [
  {
    path: `${MODULE_PATH}/mainfence`,
    component: ROUTERS.MainFenceManageComponent,
    lazyload: true
  },
  {
    path: `${MODULE_PATH}/fenceAttention`,
    component: ROUTERS.FenceAttentionComponent,
    lazyload: true
  },
  {
    path: `${MODULE_PATH}/monitoringObject`,
    component: ROUTERS.MonitoringObjectComponent,
    lazyload: true
  }
];
