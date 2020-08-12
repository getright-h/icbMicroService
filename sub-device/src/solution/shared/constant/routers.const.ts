export const ROUTERS = {
  login: () => import('~/solution/pages/login/login.module'),
  home: () => import('~/solution/pages/home/home.module'),
  demo: () => import('~/solution/pages/home/demo-component/demo.component'),
  reduxHooks: () => import('~/solution/pages/home/hooks-redux-component/hooks-redux.component')
};
