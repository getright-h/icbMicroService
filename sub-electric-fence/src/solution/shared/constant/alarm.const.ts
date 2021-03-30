export enum AlarmTypeEnum {
  // [Description("碰撞")]
  Collide = 'Collide',
  // [Description("行驶")]
  Running = 'Running',
  // [Description("震动")]
  Motion = 'Motion',
  // [Description("超速")]
  Speeding = 'Speeding',
  // [Description("离线")]
  Offline = 'Offline',
  // [Description("拆除")]
  Remove = 'Remove',
  // [Description("长停")]
  LongStay = 'LongStay',
  // [Description("人车分离")]
  Segregate = 'Segregate',
  // [Description("高危区域")]
  // RiskArea = 'RiskArea',
  // [Description("位置聚集地")]
  Focus = 'Focus',
  // [Description("上线")]
  Online = 'Online',
  // [Description("电瓶低电压")]
  BatteryLevel = 'BatteryLevel',
  // [Description("标定里程")]
  Mileage = 'Mileage',
  // [Description("服务器设置")]
  Connten = 'Connten'
}

export enum AlarmTypeEnum_FOR_REPORT {
  All = -1,
  // [Description("碰撞")]
  Collide = 1,
  // [Description("行驶")]
  Running = 2,
  // [Description("震动")]
  Motion = 3,
  // [Description("超速")]
  Speeding = 4,
  // [Description("离线")]
  Offline = 5,
  // [Description("拆除")]
  Remove = 6,
  // [Description("长停")]
  LongStay = 7,
  // [Description("人车分离")]
  Segregate = 8,
  // [Description("高危区域")]
  RiskArea = 9,
  // [Description("标定里程")]
  Calibration = 10,
  // [Description("位置聚集地")]
  Focus = 11,
  // [Description("上线")]
  Online = 12,
  // [Description("电瓶低电压")]
  BatteryLevel = 13,
  // [Description("电子围栏")]
  Fence = 14
}

export const AlarmType_FOR_REPORT = [
  { value: AlarmTypeEnum_FOR_REPORT.All, name: '全部' },
  { value: AlarmTypeEnum_FOR_REPORT.Collide, name: '碰撞报警' },
  { value: AlarmTypeEnum_FOR_REPORT.Running, name: '行驶报警' },
  { value: AlarmTypeEnum_FOR_REPORT.Motion, name: '震动报警' },
  { value: AlarmTypeEnum_FOR_REPORT.Speeding, name: '超速报警' },
  { value: AlarmTypeEnum_FOR_REPORT.Offline, name: '离线报警' },
  { value: AlarmTypeEnum_FOR_REPORT.Remove, name: '拆除报警' },
  { value: AlarmTypeEnum_FOR_REPORT.LongStay, name: '长停报警' },
  { value: AlarmTypeEnum_FOR_REPORT.Segregate, name: '人车分离报警' },
  { value: AlarmTypeEnum_FOR_REPORT.RiskArea, name: '高危区域报警' },
  { value: AlarmTypeEnum_FOR_REPORT.Calibration, name: '位置聚集地报警' },
  { value: AlarmTypeEnum_FOR_REPORT.Online, name: '上线报警' },
  { value: AlarmTypeEnum_FOR_REPORT.BatteryLevel, name: '电瓶低电压报警' },
  { value: AlarmTypeEnum_FOR_REPORT.Fence, name: '电子围栏' }
];

export const AlarmType = [
  { value: AlarmTypeEnum.Collide, name: '碰撞报警' },
  { value: AlarmTypeEnum.Running, name: '行驶报警' },
  { value: AlarmTypeEnum.Motion, name: '震动报警' },
  { value: AlarmTypeEnum.Speeding, name: '超速报警' },
  { value: AlarmTypeEnum.Offline, name: '离线报警' },
  { value: AlarmTypeEnum.Remove, name: '拆除报警' },
  { value: AlarmTypeEnum.LongStay, name: '长停报警' },
  { value: AlarmTypeEnum.Segregate, name: '人车分离报警' },
  // { value: AlarmTypeEnum.RiskArea, name: '高危区域报警' },
  { value: AlarmTypeEnum.Focus, name: '位置聚集地报警' },
  { value: AlarmTypeEnum.Online, name: '上线报警' },
  { value: AlarmTypeEnum.BatteryLevel, name: '电瓶低电压报警' },
  { value: AlarmTypeEnum.Mileage, name: '标定里程' },
  { value: AlarmTypeEnum.Connten, name: '服务器设置' }
];
