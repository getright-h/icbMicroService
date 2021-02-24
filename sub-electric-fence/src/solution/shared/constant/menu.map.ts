// 父子路由关系表
export const MENU_MAP: any = {
  /** 电子围栏 */
  // 围栏管理
  '/home/fence/fence/mainfence': ['/home/fence/mainfence'],
  // 围栏告警
  '/home/fence/fence/fenceAttention': ['/home/fence/fenceAttention'],
  // 监控对象
  '/home/fence/fence/monitoringObject': ['/home/fence/monitoringObject'],

  /** 参数管理 */
  '/home/fence/parameter': ['/home/alarm/parameter'],
  /** 定位监控 */
  '/home/fence/positionMonitor': ['/home/positionMonitor'],

  /** 指令中心 */
  // 指令列表
  '/home/fence/directive/directiveList': ['/home/directive/directiveList'],

  /**报表 */
  // 报警统计表
  '/home/fence/report/statistical': ['/home/report/statistical'],
  // 报警记录表
  '/home/fence/report/record': ['/home/report/record'],
  // 报警跟进表
  '/home/fence/report/follow': ['/home/report/follow'],
  // 监控组报表
  '/home/fence/report/monitor': ['/home/report/monitor'],
  // 常驻点统计
  '/home/fence/report/permanent': ['/home/report/permanent']
};
