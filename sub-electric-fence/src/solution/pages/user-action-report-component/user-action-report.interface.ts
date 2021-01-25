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
