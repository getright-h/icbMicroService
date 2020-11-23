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
  alarmConfig: () => import('~/solution/pages/home/alarm-manage/alarm-config-component/alarm-config.component'),
  directiveModule: () => import('~/solution/pages/home/directive-manage/directive-manage.module'),
  directiveListComponent: () =>
    import('~/solution/pages/home/directive-manage/directive-list-component/directive-list.component'),
  reportManageModule: () => import('~/solution/pages/home/report-manage/report-manage.module'),
  statisticalListComponent: () =>
    import('~/solution/pages/home/report-manage/state-list-component/state-list.component'),
  recordListComponent: () => import('~/solution/pages/home/report-manage/record-list-component/record-list.component'),
  odometerListComponent: () =>
    import('~/solution/pages/home/report-manage/odometer-list-component/odometer-list.component'),
  stateListComponent: () => import('~/solution/pages/home/report-manage/state-list-component/state-list.component'),
  offlineListComponent: () =>
    import('~/solution/pages/home/report-manage/offline-list-component/offline-list.component'),
  dwellListComponent: () => import('~/solution/pages/home/report-manage/dwell-list-component/dwell-list.component'),
  permanentListComponent: () =>
    import('~/solution/pages/home/report-manage/permanent-list-component/permanent-list.component')
};
