import { IRoute } from '~framework/interfaces/IRoute';
import LoginComponent from './login-component/login.component';

const MODULE_PATH = '/';
export const loginRoutes: IRoute[] = [
  {
    path: `${MODULE_PATH}`,
    component: LoginComponent,
    exact: true
  }
];
