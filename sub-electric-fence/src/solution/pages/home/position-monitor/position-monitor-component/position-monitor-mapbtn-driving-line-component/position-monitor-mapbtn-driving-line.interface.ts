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
  tableData: Array<any> = [];
  total = 0;
  showTable = false;
  timeInfo: any;
  dateTimeRangeControllerValue: SELECTDATE | string;
  drivingLineData: any[] = [
    [116.478935, 39.997761],
    [116.478939, 39.997825],
    [116.478912, 39.998549],
    [116.478912, 39.998549],
    [116.478998, 39.998555],
    [116.478998, 39.998555],
    [116.479282, 39.99856],
    [116.479658, 39.998528],
    [116.480151, 39.998453],
    [116.480784, 39.998302],
    [116.480784, 39.998302],
    [116.481149, 39.998184],
    [116.481573, 39.997997],
    [116.481863, 39.997846],
    [116.482072, 39.997718],
    [116.482362, 39.997718],
    [116.483633, 39.998935],
    [116.48367, 39.998968],
    [116.484648, 39.999861]
  ];
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
