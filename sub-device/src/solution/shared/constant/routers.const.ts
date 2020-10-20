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
  allocationTemplate: () =>
    import('~/solution/pages/home/base-manage/allocation-template-component/allocation-template.component'),
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
    )
};
