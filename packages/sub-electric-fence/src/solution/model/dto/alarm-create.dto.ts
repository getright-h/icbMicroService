import { Observable } from 'rxjs';

/**
 * 真实开发中，请将示例代码移除
 */

export interface AlarmCreate {
  // 你的抽象方法，具体在 Service 中实现
  alarmCreate(params: CreateParams): Observable<boolean>;
  alarmCreateBatch(): Observable<boolean>;
  alarmList(params: AlarmListParams):  Observable<{data: AlarmListReturn, total: number}>;
  alarmFollow(params: AlermFollowParams): Observable<boolean>;
}

export interface CreateParams {
  vehicleId: string;
  ownerId: string;
  fenceId: string;
  deviceCode: string;
  alarm: number;
  authorId: string;
  thingId: string;
  thingType: number;
  groupId: string;
}

export interface AlermFollowParams {
  id: string;
  status: number;
  remark: string;
}

export interface AlarmListParams {
  fenceId?: string;
  thingId?: string;
  vehicleId?: string;
  ownerId?: string;
  status?: number;
  index?: number;
  size?: number;
  begin?: number;
  end?: number;
}

export interface AlarmListReturn {
  id: string;
  deviceCode: string;
  alarm: string;
  status: number;
  statusText: string;
  time: string;
  alarmLocation: Array<number>;
  alarmAddr: string;
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
  follows: Follow[];
}

export interface Follow {
  id: string;
  remark: string;
  name: string;
  mobile: string;
  time: string;
}
