import { ColumnsType } from 'antd/lib/table';
import * as React from 'react';
export function positionMonitorMapBtnDrivingColumns(): ColumnsType<any> {
  return [
    {
      title: '设备型号',
      dataIndex: 'name'
    },
    {
      title: '设备号',
      dataIndex: 'name'
    },
    {
      title: '定位时间',
      dataIndex: 'name'
    },
    {
      title: '速度',
      dataIndex: 'name'
    },
    {
      title: '状态',
      dataIndex: 'name'
    },
    {
      title: '地址',
      dataIndex: 'name'
    }
  ];
}
