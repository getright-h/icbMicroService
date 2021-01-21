/**
 * @export state变量定义和初始化
 * @class IUserActionReportState
 */
export class IUserActionReportState {
  fontSize = 15;
}

export const userInfoConst = [
  {
    key: '车主姓名',
    value: '张三'
  },
  {
    key: '车主号码',
    value: '18485784885'
  },
  {
    key: '车架号',
    value: 'SDFWREFFFFSFF'
  },
  {
    key: '设备号',
    value: '000000001'
  },
  {
    key: '设备型号',
    value: 'TEST01'
  }
];

export const driveLineConst = [
  {
    id: 'line-1',
    isAll: true,
    duration: '30分钟',
    mileage: '15.4公里',
    startInfo: {
      time: '01-05 14:30',
      address: '四川省成都市高新区成汉南路南苑B区'
    },
    endInfo: {
      time: '01-05 14:30',
      address: '四川省成都市武侯区都会路宜家家居'
    }
  },
  {
    id: 'line-2',
    isAll: false,
    duration: '30分钟',
    mileage: '15.4公里',
    startInfo: {
      time: '01-05 14:30',
      address: '四川省成都市高新区成汉南路南苑B区'
    },
    endInfo: {
      time: '01-05 14:30',
      address: '四川省成都市武侯区都会路宜家家居'
    }
  },
  {
    id: 'line-2',
    isAll: false,
    duration: '30分钟',
    mileage: '15.4公里',
    startInfo: {
      time: '01-05 14:30',
      address: '四川省成都市高新区成汉南路南苑B区'
    },
    endInfo: {
      time: '01-05 14:30',
      address: '四川省成都市武侯区都会路宜家家居'
    }
  }
];

export const stopMarkersConst = [
  {
    id: 'marker-1',
    duration: '3天2小时',
    address: '四川省成都市高新区成汉南路南苑B区'
  },
  {
    id: 'marker-2',
    duration: '3天2小时',
    address: '四川省成都市高新区成汉南路南苑B区'
  }
];

export const alarmStatisticsConst = [
  {
    id: 'alarm-1',
    type: '超速报警',
    count: 50,
    time: '01-05 14:30',
    address: '四川省成都市高新区成汉南路南苑B区'
  },
  {
    id: 'alarm-2',
    type: '碰撞报警',
    count: 40,
    time: '01-05 14:30',
    address: '四川省成都市高新区成汉南路南苑B区'
  },
  {
    id: 'alarm-3',
    type: '围栏报警',
    count: 10,
    time: '01-05 14:30',
    address: '四川省成都市高新区成汉南路南苑B区'
  }
];
