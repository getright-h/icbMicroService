export const ROUTERS = {
  login: () => import('~/solution/pages/login/login.module'),
  home: () => import('~/solution/pages/home/home.module'),
  electricFenceManage: () =>
    import('~/solution/pages/home/electric-fence-manage-component/electric-fence-manage.module'),
  MainFenceManageComponent: () =>
    import(
      '~/solution/pages/home/electric-fence-manage-component/main-fence-manage-component/main-fence-manage.component'
    ),
  FenceAttentionComponent: () =>
    import('~/solution/pages/home/electric-fence-manage-component/fence-attention-component/fence-attention.component'),
  MonitoringObjectComponent: () =>
    import(
      '~/solution/pages/home/electric-fence-manage-component/monitoring-object-component/monitoring-object.component'
    ),
  alarmManageModule: () => import('~/solution/pages/home/alarm-manage/alarm-manage.module'),
  alarmParameter: () =>
    import('~/solution/pages/home/alarm-manage/alarm-parameter-component/alarm-parameter.component'),
  alarmConfig: () => import('~/solution/pages/home/alarm-manage/alarm-config-component/alarm-config.component')
};
