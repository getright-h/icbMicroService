import { Observable } from 'rxjs';

/**
 * 真实开发中，请将示例代码移除
 */

export abstract class PositionMonitorDTO {
  // 你的抽象方法，具体在 Service 中实现
}

export interface QueryVehicleGroupListReturn {
  id: string;
  name: string;
  roleId: string;
  organizationId: string;
  organizationName: string;
  organizationCode: string;
  remark: string;
  createTime: string;
  createTimeStamp: number;
}

export interface VehicleInfoParamReture {
  id: string;
  vinNo: string;
  ownerId: string;
  ownerName: string;
  ownerMobile: string;
  plateNo: string;
  isRunning: boolean;
  deviceList: DeviceList[];
  changeTime?: number;
  permanentPlaceList: PermanentPlaceList[];
}

interface PermanentPlaceList {
  coordinates: number[];
  number: number;
  stopTime: number;
}

export interface DeviceList {
  vehicleId: string;
  selected?: boolean;
  deviceCode: string;
  typeId: string;
  typeName: string;
  isOnline: boolean;
  coordinates: number[];
  direction: number;
}

export interface IQueryVehicleInfoPagedListParams {
  index: number;
  size: number;
  organizationId: string;
  vehicleGroupId: string;
  strValue: string;
}
