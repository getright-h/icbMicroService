import { IRoute } from '~framework/interfaces/IRoute';
import { ROUTERS } from '~/solution/shared/constant/routers.const';

// const MODULE_PATH = '/home/electric-fence-manage-component/electric-fence-manage';
const MODULE_PATH = 'home';
export const electricFenceManageRoutes: IRoute[] = [
  {
    path: `${MODULE_PATH}/mainfence`,
    component: ROUTERS.MainFenceManageComponent,
    lazyload: true
  }
];
