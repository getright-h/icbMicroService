import { IRoute } from '~framework/interfaces/IRoute';

const MODULE_PATH = 'login';
export const loginRoutes: IRoute[] = [
  {
    path: `${MODULE_PATH}`,
    component: () => import('./login-component/login.component'),
    lazyload: true,
    exact: true
  }
];
