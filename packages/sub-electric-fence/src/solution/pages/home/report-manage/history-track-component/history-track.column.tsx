export function HistoryTrackColumn(action?: Function) {
  const render = (text: any) => (text ? text : '-');
  return [
    {
      title: '所属监控组',
      dataIndex: 'groupName',
      render
    }
  ];
}
// 时间	经纬度定位	基站	定位方式	速度	设备状态	车辆状态	车牌	车架号	地址
