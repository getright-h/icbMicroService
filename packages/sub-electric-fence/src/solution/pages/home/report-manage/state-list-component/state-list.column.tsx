import { DeviceStateEnum } from '~/solution/shared/enums/home.enum';
import { REPORT_UTIL } from '~/solution/shared/util/report-manage.util';
export function StateListColumn(callbackAction: Function) {
  const render = (text: any) => (text ? text : '-');
  return [
    {
      title: '车主姓名',
      dataIndex: 'ownerName',
      ellipsis: true,
      render
    },
    {
      title: '车牌号',
      dataIndex: 'plateNo',
      render
    },
    {
      title: '车架号',
      dataIndex: 'vinNo',
      // width: 180,
      render
    },
    {
      title: '设备号',
      dataIndex: 'deviceCode',
      // width: 150,
      render
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (text: number) => DeviceStateEnum[text]
    },
    {
      title: '运行模式',
      dataIndex: 'runMode',
      render
    },
    {
      title: '最后上线时间',
      dataIndex: 'statusTime',
      width: 180,
      render
    },
    {
      title: 'GPS信号',
      dataIndex: 'satelliteStatus',
      render
    },
    {
      title: '电压',
      dataIndex: 'voltage',
      render
    },
    {
      title: '所属机构',
      dataIndex: 'organizationName',
      ellipsis: true,
      width: 240,
      render
    },
    {
      title: '地址',
      dataIndex: 'address',
      ellipsis: true,
      width: 400,
      render
    },
    {
      title: '经纬度',
      dataIndex: 'lnglat',
      ellipsis: true,
      width: 160,
      render: (text: any, data: any) => REPORT_UTIL.linkToMapWithLnglat(data.longitude, data.latitude)
    }
  ];
}
