import { Observable } from 'rxjs';

/**
 * 真实开发中，请将示例代码移除
 */

export interface MonitorObjectServiceDTO {
  // 你的抽象方法，具体在 Service 中实现
  vehicleList(params: MonitorObjectListParams): Observable<{data: Array<MonitorObjectListreturn>, total: number}>;
  vehicleBind(params: VehicleBindParams): Observable<boolean>;
  vehicleUnbind(params: {id: string}): Observable<boolean>;
  vehicleEdit(params: {id: string}): Observable<boolean>;
  vehicleEditBatch(params: EditBatchParams): Observable<boolean>;
  vehicleDdlThing(params: { key: string }): Observable<{ data: Array<DllThingReturn> }>
}

export interface MonitorObjectListreturn {
  id: string;
  beginDate: string;
  endDate: string;
  status: number;
  createTime: string;
  fenceId: string;
  fenceName: string;
  thingId: string;
  thingType: number;
  thingName: string;
  vehicleId: string;
  plateNumber: string;
  vin: string;
  groupId: string;
  groupName: string;
  ownerId: string;
  ownerName: string;
  ownerMobile: string;
}

export interface MonitorObjectListParams {
  fenceId: string;
  thingId: string;
  keyId: string;
  keyType: string;
  ownerId: string;
  index: number;
  size: number;
  begin: string | any;
  end: string | any;
}

export interface DllThingReturn {
  key: string;
  value: string;
  type: number;
}

export interface VehicleBindParams {
  fenceId: string;
  bindData: BindDatum[];
  begin: any;
  end: any;
  beginDate: any;
  endDate: any;
}

export interface VehicleEditParams {
  id: string;
  fenceId: string;
  begin: string;
  end: string;
}

export interface BindDatum {
  thingId: string;
  thingType: number;
}
export interface EditBatchParams {
  id: string;
  fenceId: string;
  begin: string;
  end: string;
}