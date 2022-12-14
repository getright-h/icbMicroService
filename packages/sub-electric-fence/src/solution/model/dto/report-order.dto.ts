import { Observable } from 'rxjs';

/**
 * 真实开发中，请将示例代码移除
 */

export interface OrderReportManage {
  // 你的抽象方法，具体在 Service 中实现
  queryResidentPagedList(params: ReportAlarmStatisticsInput): Observable<{ dataList: any[]; total: number }>;
  queryReportAlarmStatistics(params: ReportAlarmStatisticsInput): Observable<{ data: any[]; total: number }>;
  queryMonitorAlarmInfoPagedList(params: ReportAlarmStatisticsInput): Observable<boolean>;
  queryReportAlarmStatisticsDetail(params: { deviceCode: string; alarmType: string }): Observable<boolean>;
  queryAlarmOriginalPagedList(params: ReportAlarmStatisticsInput): Observable<boolean>;
}

export interface ReportAlarmStatisticsInput {
  strValue: string; //,
  alarmType: number; // = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '-1']
  organizationId: string; //,
  index: number; //,
  size: number; //,
  beginTime: number; //,
  endTime: number; //
}

export class QueryReportTrafficReturn {
  versionName: string;
  currentAddressDetail: string;
  plateNo: string;
  picture: string;
  ownerName: string;
  ownerMobile: string;
  vinNo: string;
  deviceCode: string;
  typeName: string;
  status: string;
  statusTime: string;
  signal: number;
  signalText: string;
  mileage: number;
  longitude: number;
  latitude: number;
  pointList: PointList[];
  pointPassList: PointPassList[];
  residentList: ResidentList[];
  alarmTypeList: AlarmTypeList[];
}

export interface AlarmTypeList {
  alarmTypeCount: number;
  alarmType: number;
  alarmTypeText: string;
  alarmList: AlarmList[];
}

export interface AlarmList {
  time: string;
  longitude: number;
  address: string;
  latitude: number;
}

export interface ResidentList {
  longitude: number;
  address: string;
  coordinates: Array<number>;
  latitude: number;
  number: number;
  time: number;
  stopTime?: number;
}

export interface PointPassList {
  startTime: number;
  endAddress: string;
  startAddress: string;
  startLon: number;
  startLat: number;
  endTime: number;
  endLon: number;
  endLat: number;
  mileage: number;
}

export interface PointList {
  coordinates: number[];
  direction: number;
  speed: number;
  time: number;
  stop: boolean;
  satellitesNum: number;
}

export interface ReportMonitorAlarmGroupInput {
  strValue: string;
  groupId: string;
  organizationId: string;
  index: number;
  size: number;
}

export interface QueryMonitorDeviceStatusInput {
  strValue: string;
  status: number;
  organizationId: string;
  index: number;
  size: number;
  beginTime: number;
  endTime: number;
}

export interface QueryMonitorDeviceOfflineInput {
  strValue: string;
  organizationId: string;
  index: number;
  size: number;
  beginTime: number;
  endTime: number;
}

export interface QueryHistoryPagedListReqType {
  deviceCode: string;
  index: number;
  size: number;
  beginTime: number;
  endTime: number;
}

export interface QueryHistoryPagedListResType {
  time: string;
  longitude: number;
  latitude: number;
  baseStation: string;
  positionStyle: string;
  speed: number;
  vehicleStatus: number;
  plateNo: string;
  vinNo: string;
}

export interface HistoryExportReqType {
  name: string;
  deviceCode: string;
  beginTime: number;
  endTime: number;
}

export interface DeviceAnalyseReqType {
  deviceCode: string;
  beginTime: number;
  endTime: number;
}
