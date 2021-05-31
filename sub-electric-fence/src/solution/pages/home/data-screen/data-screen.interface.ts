import {
  AlarmStatRequest,
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
  num = 0;
  organizationId: string;

  // getFenceAlarmStat
  fenceCount = 0;
  fenceVehicleCount = 0;

  // getTotalStat
  bindVehicleCount = 0;
  deviceCount = 0;
  vehicleCount = 0;
  vehicleBinds: VehicleBindDto[] = [];

  // getAlarmStat
  // request
  // alarmForm: AlarmStatRequest = {
  //   organizationIds: [],
  //   alarmTypeTimeRange: { start: 0, end: 0 },
  //   alarmFollowTimeRange: { start: 0, end: 0 },
  //   groupAlarmTimeRange: { start: 0, end: 0 }
  // };
  alarmForm: Omit<AlarmStatRequest, 'organizationIds'> = {
    alarmTypeTimeRange: { start: 1611931297000, end: 1621931297000 },
    alarmFollowTimeRange: { start: 1611931297000, end: 1621931297000 },
    groupAlarmTimeRange: { start: 1611931297000, end: 1621931297000 }
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

export const geoCoordMap = {
  北京市: [116.405285, 39.904989],
  天津市: [117.190182, 39.125596],
  河北省: [114.502461, 38.045474],
  山西省: [112.549248, 37.857014],
  内蒙古自治区: [111.670801, 40.818311],
  辽宁省: [123.429096, 41.796767],
  吉林省: [125.3245, 43.886841],
  黑龙江省: [126.642464, 45.756967],
  上海市: [121.472644, 31.231706],
  江苏省: [118.767413, 32.041544],
  浙江省: [120.153576, 30.287459],
  安徽省: [117.283042, 31.86119],
  福建省: [119.306239, 26.075302],
  江西省: [115.892151, 28.676493],
  山东省: [117.000923, 36.675807],
  河南省: [113.665412, 34.757975],
  湖北省: [114.298572, 30.584355],
  湖南省: [112.982279, 28.19409],
  广东省: [113.280637, 23.125178],
  广西壮族自治区: [108.320004, 22.82402],
  海南省: [110.33119, 20.031971],
  重庆市: [106.504962, 29.533155],
  四川省: [104.065735, 30.659462],
  贵州省: [106.713478, 26.578343],
  云南省: [102.712251, 25.040609],
  西藏自治区: [91.132212, 29.660361],
  陕西省: [108.948024, 34.263161],
  甘肃省: [103.823557, 36.058039],
  青海省: [101.778916, 36.623178],
  宁夏回族自治区: [106.278179, 38.46637],
  新疆维吾尔自治区: [87.617733, 43.792818],
  台湾省: [121.509062, 25.044332],
  香港特别行政区: [114.173355, 22.320048],
  澳门特别行政区: [113.54909, 22.198951],
  '0': [104, 55]
};
