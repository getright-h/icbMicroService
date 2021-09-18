import { ColumnsType } from 'antd/lib/table';
import * as React from 'react';
export function positionMonitorMapAearSearchColumns(): ColumnsType<any> {
  return [
    {
      title: '车主',
      dataIndex: 'deviceCode'
    },
    {
      title: '车牌号',
      dataIndex: 'time'
    },
    {
      title: '设备号',
      dataIndex: 'speed'
    },
    {
      title: '设备状态',
      dataIndex: 'state'
    },
    {
      title: '速度',
      dataIndex: 'state'
    },
    {
      title: '地址',
      dataIndex: 'state'
    }
  ];
}
