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
  BatteryLevel = 'BatteryLevel'
}

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
  { value: AlarmTypeEnum.BatteryLevel, name: '电瓶低电压报警' }
];
