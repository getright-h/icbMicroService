import { QueryReportTrafficReturn } from '~/solution/model/dto/report-order.dto';

/**
 * @export state变量定义和初始化
 * @class IUserActionReportState
 */
export class IUserActionReportState {
  fontSize = 15;
  loading = true;
  currentChoose: '';
  deviceCode = '';
  curDeviceCode = '';
  isModalVisible = false;
  currentPoint: POINT_NUMBER = POINT_NUMBER.baseInfo;
  actionData: QueryReportTrafficReturn = new QueryReportTrafficReturn();
}

export enum POINT_NUMBER {
  baseInfo,
  carLocation,
  carDriveLine,
  alwaysStopMarkers,
  alarmStatistics
}

export const tabHeaderConst = [
  { key: POINT_NUMBER.baseInfo, name: '车辆信息' },
  { key: POINT_NUMBER.carLocation, name: '车辆定位' },
  { key: POINT_NUMBER.carDriveLine, name: '车辆轨迹' },
  { key: POINT_NUMBER.alwaysStopMarkers, name: '常驻地点' },
  { key: POINT_NUMBER.alarmStatistics, name: '24h报警统计' }
];

export const userInfoConst = [
  {
    key: '车主姓名',
    value: 'ownerName'
  },
  {
    key: '车主号码',
    value: 'ownerMobile'
  },
  {
    key: '设备号',
    value: 'deviceCode'
  },
  {
    key: '设备型号',
    value: 'typeName'
  },
  {
    key: '车架号',
    value: 'vinNo'
  }
];
