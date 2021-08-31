import {
  AlarmTypeStatisticDto,
  GpsPanelStatisticMileageSummaryDto,
  GpsPanelStatisticOfflineSummaryDto,
  GpsPanelVehicleStatusDto,
  GroupAlarmSummaryStatisticDto,
  OrganizationAlarmStatisticDto,
  VehicleBindDto
} from '~/solution/model/dto/data-screen.dto';

/**
 * @export state变量定义和初始化
 * @class IDataScreenState
 */
export class IDataScreenState {
  isFull = false;
  organizationId: string;
  scale = 1;

  // getFenceAlarmStat
  fenceCount = 0;
  fenceVehicleCount = 0;

  // getTotalStat
  bindVehicleCount = 0;
  deviceCount = 0;
  vehicleCount = 0;
  vehicleBinds: VehicleBindDto[] = [];

  // getAlarmStat
  // timeRange
  timeRange: Record<string, string> = {
    alarmType: 'all',
    alarmFollow: 'all',
    groupAlarm: 'all'
  };
  // response
  alarmCount = 0;
  alarmFollowCount = 0;
  fenceAlarmTodayCount = 0;
  alarmTypeStatistics: AlarmTypeStatisticDto[] = [];
  groupAlarmStatistic: GroupAlarmSummaryStatisticDto[] = [];
  organizationAlarmStatistic: OrganizationAlarmStatisticDto = {
    data: [],
    alarmTotal: 0,
    followedTotal: 0,
    followingTotal: 0,
    unFollowTotal: 0
  };

  // getGpsStat
  offline: GpsPanelStatisticOfflineSummaryDto = {
    total: 0,
    offline: []
  };
  vehicleStatus: GpsPanelVehicleStatusDto = {
    onlineCount: 0,
    offlineCount: 0,
    data: []
  };
  mileage: GpsPanelStatisticMileageSummaryDto = {
    total: 0,
    mileage: []
  };
}
export interface CustomPanelProps {
  children: any;
  title: string;
}

export const gradients = {
  orange: {
    type: 'linear',
    x: 0,
    y: 1,
    x2: 0,
    y2: 0,
    colorStops: [
      {
        offset: 0,
        color: '#FF822E'
      },
      {
        offset: 1,
        color: '#F7C83C'
      }
    ]
  },
  red: {
    type: 'linear',
    x: 0,
    y: 1,
    x2: 0,
    y2: 0,
    colorStops: [
      {
        offset: 0,
        color: '#FF3A5A'
      },
      {
        offset: 1,
        color: '#FB8474'
      }
    ]
  },
  purple: {
    type: 'linear',
    x: 0,
    y: 1,
    x2: 0,
    y2: 0,
    colorStops: [
      {
        offset: 0,
        color: '#5A42EC'
      },
      {
        offset: 1,
        color: '#4B77FE'
      }
    ]
  },
  blue: {
    type: 'linear',
    x: 0,
    y: 1,
    x2: 0,
    y2: 0,
    colorStops: [
      {
        offset: 0,
        color: '#0966FF'
      },
      {
        offset: 1,
        color: '#3CB1FF'
      }
    ]
  }
};
