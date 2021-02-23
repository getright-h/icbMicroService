export const MENU_MAP: any = {
  /** 库存管理 */

  // 全部设备管理
  '/home/device/stock/all': [],
  // 采购单管理
  '/home/device/stock/purchase': [],
  // 出入库管理
  '/home/device/stock/in-out': [],

  /** 设备调拨 */
  // 调拨单
  '/home/device/allocation/manage': [
    '/home/device/allocation/allocationDetail' // 调拨单详情
  ],

  // 调拨流程
  '/home/device/allocation/process': [
    '/home/device/allocation/initDetail' // 调拨单详情
  ],

  /** 监控组 */
  // 监控组管理
  '/home/device/monitor/monitorManage': [],
  /** 数据报表 */

  // 设备路线表
  '/home/device/data/deviceLine': [],

  /** 基础管理 */
  // 仓库设置
  '/home/device/baseManage/warehouse': [],
  // 设备型号设置

  '/home/device/baseManage/deviceTypeSetting': [],

  /** 审批管理 */
  // 审批管理
  '/home/device/approvalManage/approvalManage': [
    '/home/device/approvalManage/approvalManageDetail', // 审批管理详情
    '/home/device/approvalManage/approvalEditTemplateFormModal', // 审批管理编辑
    '/home/device/approvalManage/approvalTemplateFormModal' // 新增审批
  ],
  // 审批模板
  '/home/device/approvalManage/approvalTemplate': [
    '/home/device/approvalManage/addTemplate' // 创建审批模板 OR 编辑审批模板
  ],
  /** 客户管理 */
  // 车主管理
  '/home/device/customer/owner': [],
  // 车辆管理
  '/home/device/customer/vehicle': [
    '/home/device/customer/vehicleDetail' // 车辆详情
  ],
  // 安装凭证管理
  '/home/device/voucher/manage': []
};
