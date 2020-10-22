export const ROUTERS = {
  login: () => import('~pages/login/login.module'),
  home: () => import('~pages/home/home.module'),
  warehouseManage: () => import('~/solution/pages/home/base-manage/base-manage.module'),

  stockManageModule: () => import('~pages/home/stock-manage/stock-manage.module'),
  stockAll: () => import('~pages/home/stock-manage/stock-manage-component/stock-manage.component'),
  stockInOut: () => import('~pages/home/stock-manage/in-out-stock-component/in-out-stock.component'),
  purchaseOrder: () => import('~pages/home/stock-manage/purchase-order-component/purchase-order.component'),

  allocationManageModule: () => import('~pages/home/allocation-manage/allocation-manage.module'),
  allocationManage: () =>
    import('~pages/home/allocation-manage/allocation-manage-component/allocation-manage.component'),
  allocationProcess: () =>
    import('~pages/home/allocation-manage/allocation-process-component/allocation-process.component'),
  allocationDetail: () =>
    import(
      '~pages/home/allocation-manage/allocation-manage-component/allocation-detail-component/allocation-detail.component'
    ),
  createAllocation: () =>
    import(
      '~/solution/pages/home/allocation-manage/allocation-manage-component/create-allocation-component/create-allocation.component'
    ),
  initDetail: () =>
    import(
      '~/solution/pages/home/allocation-manage/allocation-process-component/init-allocation-component/detail-component/detail.component'
    ),
  receiveDetail: () =>
    import(
      '~/solution/pages/home/allocation-manage/allocation-process-component/receive-allocation-component/detail-component/detail.component'
    ),
  warehouseList: () => import('~/solution/pages/home/base-manage/warehouse-list-component/warehouse-list.component'),
  addOrEditallocationTemplate: () =>
    import(
      '~/solution/pages/home/base-manage/allocation-template-component/template-edit-component/template-edit.component'
    ),
  approvalManageModule: () => import('~pages/home/approval-manage/approval-manage.module'),
  approvalManage: () => import('~pages/home/approval-manage/approval-manage-component/approval-manage.component'),
  approvalTemplate: () =>
    import('~/solution/pages/home/approval-manage/appraval-template-component/appraval-template.component'),
  addTemplate: () =>
    import(
      '~/solution/pages/home/approval-manage/appraval-template-component/add-template-component/add-template.component'
    ),
  // 监控组
  monitorManagModule: () => import('~/solution/pages/home/monitor-manage/monitor-manage.module'),
  monitorManage: () => import('~/solution/pages/home/monitor-manage/monitor-manage-component/monitor-manage.component'),
  // 数据报表
  dataManagModule: () => import('~/solution/pages/home/data-manage/data-manage.module'),
  deviceMonitor: () => import('~/solution/pages/home/data-manage/device-monitor-component/device-monitor.component'),
  deviceLine: () => import('~/solution/pages/home/data-manage/device-line-component/device-line.component'),
  carTypeSetting: () =>
    import('~/solution/pages/home/base-manage/car-type-setting-component/car-type-setting.component'),
  supplierSetting: () =>
    import('~/solution/pages/home/base-manage/supplier-setting-component/supplier-setting.component'),
  deviceTypeSetting: () =>
    import('~/solution/pages/home/base-manage/device-type-setting-component/device-type-setting.component'),
  addSupplier: () =>
    import('~/solution/pages/home/base-manage/supplier-setting-component/add-supplier-component/add-supplier.component')
};
