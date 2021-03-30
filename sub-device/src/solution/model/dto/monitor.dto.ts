import { Observable } from 'rxjs';

/**
 * 真实开发中，请将示例代码移除
 */

export abstract class MonitorDTO {
  // 你的抽象方法，具体在 Service 中实现
  abstract example(params: InsertMonitorVehicleparams): Observable<ExampleResponseResult>;
}

// 示例 Dto
export interface InsertMonitorVehicleparams {
  groupId: string; //组id ,
  organizationCodeList : any[]; // 机构code列表 ,
  vehicleVinNoList : any[]; // 车架号列表 ,
  removeList : any[]; // 去除的车
}

// 响应 Dto
export interface ExampleResponseResult {
  data:any,
  status:boolean,
}
