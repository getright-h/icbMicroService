import { IRoute } from '~framework/interfaces/IRoute';
import HomeModule from './home/home.module';
import LoginModule from './login/login.module';

export const appRoutes: IRoute[] = [
  {
    path: '/home',
    component: HomeModule,
    exact: false
  },
  {
    path: '/login',
    component: LoginModule
  }
];
