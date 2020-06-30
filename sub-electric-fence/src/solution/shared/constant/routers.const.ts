export const ROUTERS = {
  login: () => import('~/solution/pages/login/login.module'),
  home: () => import('~/solution/pages/home/home.module'),
  electricFenceManage: () =>
    import('~/solution/pages/home/electric-fence-manage-component/electric-fence-manage.module'),
  MainFenceManageComponent: () =>
    import(
      '~/solution/pages/home/electric-fence-manage-component/main-fence-manage-component/main-fence-manage.component'
    )
};
