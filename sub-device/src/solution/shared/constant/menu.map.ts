export const MENU_MAP: any = {
  /** 库存管理 */

  // 全部设备管理
  '/home/device/stock/all': [
    '/home/stock/all' // 全部设备管理-子系统用
  ],
  // 采购单管理
  '/home/device/stock/purchase': [
    '/home/stock/purchase' // 采购单管理-子系统用
  ],
  // 出入库管理
  '/home/device/stock/in-out': [
    '/home/stock/in-out' // 出入库管理-子系统用
  ],

  /** 设备调拨 */
  // 调拨单
  '/home/device/allocation/manage': [
    '/home/allocation/manage', // 调拨单-子系统用
    '/home/device/allocation/allocationDetail', // 调拨单详情
    '/home/allocation/allocationDetail' // 调拨单详情-子系统用
  ],

  // 调拨流程
  '/home/device/allocation/process': [
    '/home/allocation/process', // 调拨流程-子系统用
    '/home/device/allocation/initDetail', // 调拨单详情
    '/home/allocation/initDetail' // 调拨单详情-子系统用
  ],

  /** 监控组 */
  // 监控组管理
  '/home/device/monitor/monitorManage': [
    '/home/monitor/monitorManage' // 监控组管理-子系统用
  ],

  /** 数据报表 */
  // 设备路线表
  '/home/device/data/deviceLine': [
    '/home/data/deviceLine' // 设备路线表-子系统用
  ],

  /** 基础管理 */
  // 仓库设置
  '/home/device/baseManage/warehouse': [
    '/home/baseManage/warehouse' // 仓库设置-子系统用
  ],
  // 设备型号设置
  '/home/device/baseManage/deviceTypeSetting': [
    '/home/baseManage/deviceTypeSetting' // 设备型号设置-子系统用
  ],

  /** 审批管理 */
  // 审批管理
  '/home/device/approvalManage/approvalManage': [
    '/home/approvalManage/approvalManage', // 审批管理-子系统用
    '/home/device/approvalManage/approvalManageDetail', // 审批管理详情
    '/home/device/approvalManage/approvalEditTemplateFormModal', // 审批管理编辑
    '/home/device/approvalManage/approvalTemplateFormModal', // 新增审批
    '/home/approvalManage/approvalManageDetail', // 审批管理详情-子系统用
    '/home/approvalManage/approvalEditTemplateFormModal', // 审批管理编辑-子系统用
    '/home/approvalManage/approvalTemplateFormModal' // 新增审批-子系统用
  ],
  // 审批模板
  '/home/device/approvalManage/approvalTemplate': [
    '/home/approvalManage/approvalTemplate', // 审批模板
    '/home/device/approvalManage/addTemplate', // 创建审批模板 OR 编辑审批模板
    '/home/approvalManage/addTemplate' // 创建审批模板 OR 编辑审批模板-子系统用
  ],
  /** 客户管理 */
  // 车主管理
  '/home/device/customer/owner': [
    '/home/customer/owner' // 车主管理-子系统用
  ],
  // 车辆管理
  '/home/device/customer/vehicle': [
    '/home/customer/vehicle', // 车辆管理-子系统用
    '/home/device/customer/vehicleDetail', // 车辆详情
    '/home/customer/vehicleDetail' // 车辆详情-子系统用
  ],
  // 安装凭证管理
  '/home/device/voucher/manage': [
    '/home/voucher/manage' // 安装凭证管理-子系统用
  ]
};
