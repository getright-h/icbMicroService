import { IRoute } from '~framework/interfaces/IRoute';
export const appRoutes: IRoute[] = [
  {
    path: 'home',
    component: () => import('./home/home.module'),
    lazyload: true
  },
  {
    path: '',
    component: () => import('./login/login.module'),
    lazyload: true
  }
];
