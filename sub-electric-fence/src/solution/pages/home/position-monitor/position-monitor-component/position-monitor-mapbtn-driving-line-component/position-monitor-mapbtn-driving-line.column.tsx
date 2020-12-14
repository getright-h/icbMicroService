import { ColumnsType } from 'antd/lib/table';
import * as React from 'react';
export function positionMonitorMapBtnDrivingColumns(): ColumnsType<any> {
  return [
    {
      title: '设备号',
      dataIndex: 'deviceCode'
    },
    {
      title: '定位时间',
      dataIndex: 'time'
    },
    {
      title: '速度',
      dataIndex: 'speed'
    },
    {
      title: '状态',
      dataIndex: 'time'
    },
    {
      title: '地址',
      dataIndex: 'coordinates'
    }
  ];
}
