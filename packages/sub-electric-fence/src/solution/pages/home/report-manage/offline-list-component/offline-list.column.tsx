import { REPORT_UTIL } from '~/solution/shared/util/report-manage.util';

export function OfflineListColumn(callbackAction: Function) {
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
      title: '设备号',
      dataIndex: 'deviceCode',
      width: 150,
      render
    },
    {
      title: '离线时长',
      dataIndex: 'offlineTime',
      render
    },
    {
      title: '最后上线时间',
      dataIndex: 'lastTime',
      render
    },
    {
      title: '经纬度',
      dataIndex: 'lnglat',
      ellipsis: true,
      width: 160,
      render: (text: any, data: any) => REPORT_UTIL.linkToMapWithLnglat(data.longitude, data.latitude)
    },
    {
      title: '地址',
      dataIndex: 'address',
      ellipsis: true,
      width: 400,
      render
    },
    {
      title: '所属机构',
      dataIndex: 'organizationName',
      ellipsis: true,
      width: 300,
      render
    }
  ];
}
