import {
  RealTimeTrackingReturn,
  QueryVehicleTrajectoryArrayListReturn
} from '~/solution/model/dto/position-monitor.dto';

/**
 * @export state变量定义和初始化
 * @class IPositionMonitorMapbtnDrivingLineState
 */
export class IPositionMonitorMapbtnDrivingLineState {
  refreshTime: string;
  isLoading = false;
  searchForm = {
    index: 1,
    size: 10
  };
  deviceCode: string;
  currentPoint = 0;
  playbackLoading = false;
  carSpeedBase = 1;
  isRunning: boolean;
  tableData: Array<QueryVehicleTrajectoryArrayListReturn> = [];
  total = 0;
  showTable = false;
  timeInfo: any;
  dateTimeRangeControllerValue: SELECTDATE | string;
  drivingLineData: RealTimeTrackingReturn = { pointList: [] };
  stopMarkers: any[] = [
    [116.478935, 39.997761],
    [116.478998, 39.998555],
    [116.481149, 39.998184],
    [116.484648, 39.999861]
  ];
}

export type IPositionMonitorMapbtnDrivingProps = {
  mapbtnDrivingVisible: boolean;
  closeMapDrivingPage: () => void;
};

export enum SELECTDATE {
  TODAY,
  YESTORDAY,
  BEFOREYESTORDAY,
  RECENTSERVENDAY,
  RECENTTHIRDTY
}

export const SELECTDATECONST = [
  {
    day: SELECTDATE.TODAY,
    title: '今天'
  },
  {
    day: SELECTDATE.YESTORDAY,
    title: '昨天'
  },
  {
    day: SELECTDATE.BEFOREYESTORDAY,
    title: '前天'
  },
  {
    day: SELECTDATE.RECENTSERVENDAY,
    title: '最近一周'
  },
  {
    day: SELECTDATE.RECENTTHIRDTY,
    title: '最近一个月'
  }
];
