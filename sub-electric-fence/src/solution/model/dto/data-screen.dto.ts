import { Observable } from 'rxjs';

/**
 * 真实开发中，请将示例代码移除
 */

export abstract class DataScreenDTO {
  // 你的抽象方法，具体在 Service 中实现
}

// 示例 Dto
export interface AlarmStatRequest {
  organizationIds: string[];
  alarmTypeTimeRange: TimeRangeDto;
  alarmFollowTimeRange: TimeRangeDto;
  groupAlarmTimeRange: TimeRangeDto;
}

export interface GpsStatRequest {
  organizationIds: string[];
  mielageParam: { min: number; max: number }[];
  offlineTimeStamps: number[];
}

// 响应 Dto
export interface FenceStatReturn {
  fenceCount: number;
  fenceVehicleCount: number;
}

export interface TotalStatReturn {
  bindVehicleCount: number;
  deviceCount: number;
  vehicleCount: number;
  vehicleBinds: VehicleBindDto[];
}

export interface AlarmStatReturn {
  alarmCount: number;
  alarmFollowCount: number;
  fenceAlarmTodayCount: number;
  alarmTypeStatistics: AlarmTypeStatisticDto[];
  groupAlarmStatistic: GroupAlarmSummaryStatisticDto[];
  organizationAlarmStatistic: OrganizationAlarmStatisticDto;
}

export interface GpsStatReturn {
  offline: GpsPanelStatisticOfflineSummaryDto;
  vehicleStatus: GpsPanelVehicleStatusDto;
  mileage: GpsPanelStatisticMileageSummaryDto;
}

// extra
export interface VehicleBindDto {
  organizationId: string;
  organizationName: string;
  anZhuang: number;
  unAnZhuang: number;
  total: number;
}

interface TimeRangeDto {
  start: number;
  end: number;
}

export interface AlarmTypeStatisticDto {
  alarmType: number;
  alarmTypeText: string;
  count: number;
}

export interface GroupAlarmSummaryStatisticDto {
  groupId: string;
  groupName: string;
  data: GroupAlarmDetailStatisticDto[];
  total: number;
}

interface GroupAlarmDetailStatisticDto {
  alarmType: string;
  alarmTypeText: string;
  count: number;
}

export interface OrganizationAlarmStatisticDto {
  data: OrganizationAlarmStatisticData[];
  alarmTotal: number;
  followedTotal: number;
  followingTotal: number;
  unFollowTotal: number;
}
export interface OrganizationAlarmStatisticData {
  organizationId: string;
  organizationName: string;
  total: number;
  unFollow: number;
  following: number;
  followed: number;
}

export interface GpsPanelStatisticOfflineSummaryDto {
  total: number;
  offline: GpsPanelStatisticOfflineDetailDto[];
}

export interface GpsPanelStatisticOfflineDetailDto {
  timeStamp: number;
  count: number;
  percent: number;
}

export interface GpsPanelVehicleStatusDto {
  onlineCount: number;
  offlineCount: number;
  data: GpsPanelVehicleRegionDto[];
}

export interface GpsPanelVehicleRegionDto {
  onlineCount: number;
  offlineCount: number;
  totalCount: number;
  province: string;
}

export interface GpsPanelStatisticMileageSummaryDto {
  total: number;
  mileage: GpsPanelStatisticMileageDto[];
}

export interface GpsPanelStatisticMileageDto {
  min: number;
  max: number;
  count: number;
  percent: number;
}
