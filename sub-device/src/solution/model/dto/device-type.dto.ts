export interface IReturn {
  data: any;
  status: boolean;
}


// 搜索设备参数
export interface StockDevicePagedListDto {
  deviceValue?: string ; // Code、Sim ,
typeId?: string ; // 设备类型Id ,
state?: number ;//设备状态 = ['1', '2', '3', '-1'],
purchaseId?: string ; // 采购单 ,
storePositionId?: string ; // 仓位Id ,
duration?: number ;//仓库库存时长 ,
isAlarm?: number ;//仓位超时报警 (1是 0否) ,
organizationId?: string ; // 机构Id ,
storeId?: string ; // 仓库的Id ,
index: number;
size: number;
beginTime?: number;
endTime?: number;
}
// 设备下拉框选择
export interface DeviceSimpleInput {
  code: string,
storePositionId: string,
index : number,
size : number,
beginTime : number,
endTime : number
}
//设备管理设备详情 
export interface IDeviceDetail {
  materialId: string;
}
// 新增设备类型
export interface IAddDeviceTypeDTO {
  id: string;
  name : string; // 名称 ,
alias : string; // 别名 ,
image : string; // 图片 ,
supplierId : string; // 供应商Id ,
locationStyle : string; // 定位方式 ,
isWideVoltage: boolean; // 是否宽电压 ,
workVoltage : string; // 工作电压/电流 ,
led : string; // LED ,
batteryDesc : string; // 内置电池描述 ,
standbyCurrent : string; // 待机电流 ,
color : string; // 颜色 ,
size : string; // 尺寸 ,
weight : string; // 重量 ,
waterProof : string; // 防水等级 ,
functionMark : string; // 功能标志 ,
instructionsMark : string; // 指令标志 ,
alarmMark : string; // 告警标志 ,
isWired: boolean; // 是否有线 ,
sort: number; // 排序 ,
remark : string; // 备注
}
// 删除设备型号 && 设备详情
export interface IDeviceTypeDTO  {
  id: string;
}
//查询设备类型分页列表 
export interface DeviceTypePagedListDto  {
  name: string; // 设备类型名称 ,
index : number;
size : number;
beginTime ?: number;
endTime ?: number;
}