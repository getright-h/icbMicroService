export const MENU_MAP: any = {
  /** 库存管理 */

  // 全部设备管理
  '/home/stock/all': [],
  // 采购单管理
  '/home/stock/purchase': [],
  // 出入库管理
  '/home/stock/in-out': [],

  /** 设备调拨 */
  // 调拨单
  '/home/device/allocation/manage': [
    '/home/device/allocation/initDetail' // 调拨单详情
  ],

  // 调拨流程
  '/home/device/allocation/process': [
    '/home/device/allocation/initDetail' // 调拨单详情
  ],

  /** 监控组 */
  // 监控组管理
  '/home/monitor/monitorManage': [],
  /** 数据报表 */

  // 设备路线表
  '/home/data/deviceLine': [],

  /** 基础管理 */
  // 仓库设置
  '/home/baseManage/warehouse': [],
  // 设备型号设置

  '/home/baseManage/deviceTypeSetting': [],

  /** 审批管理 */
  // 审批管理
  '/home/approvalManage/approvalManage': [
    '/home/approvalManage/approvalManageDetail', // 审批管理详情
    '/home/approvalManage/approvalEditTemplateFormModal', // 审批管理编辑
    '/home/approvalManage/approvalTemplateFormModal' // 新增审批
  ],
  // 审批模板
  '/home/approvalManage/approvalTemplate': [
    '/home/approvalManage/addTemplate' // 创建审批模板 OR 编辑审批模板
  ],
  /** 客户管理 */
  // 车主管理
  '/home/customer/owner': [],
  // 车辆管理
  '/home/customer/vehicle': [
    '/home/customer/vehicleDetail' // 车辆详情
  ],
  // 安装凭证管理
  '/home/voucher/manage': []
};
