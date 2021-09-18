import { IRoute } from '~framework/interfaces/IRoute';
import { ROUTERS } from '~/solution/shared/constant/routers.const';

const MODULE_PATH = 'home/directive';
export const directiveManageRoutes: IRoute[] = [
  {
    path: `${MODULE_PATH}/directiveList`,
    component: ROUTERS.directiveListComponent,
    lazyload: true,
    exact: true
  }
];
