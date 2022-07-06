import React from 'react';
import { REPORT_UTIL } from '~/solution/shared/util/report-manage.util';

export function AreaSearchCarColumn(action?: Function) {
  const render = (text: any) => (text ? text : '-');
  return [
    {
      title: '设备号',
      dataIndex: 'dc',
      render
    },
    {
      title: '终端时间',
      dataIndex: 'time',
      render
    },
    {
      title: '速度',
      dataIndex: 'sp'
    },
    {
      title: '方向',
      dataIndex: 'dr',
      render
    },
    {
      title: '卫星数量',
      dataIndex: 'sn',
      render
    },
    {
      title: '里程',
      dataIndex: 'ml',
      render
    },

    {
      title: '电压',
      dataIndex: 'vt',
      render
    },
    {
      title: '补传数据',
      dataIndex: 'ap',
      render
    },
    {
      title: '经纬度',
      dataIndex: 'coordinate',
      ellipsis: true,
      width: 160,
      render: (text: any, data: any) => REPORT_UTIL.linkToMapWithLnglat(data.lg, data.lt)
    },
    {
      title: '地址',
      dataIndex: 'address',
      ellipsis: true,
      width: 400,
      render
    }
  ];
}
