import { ColumnsType } from 'antd/lib/table';
import * as React from 'react';
export function positionMonitorMapBtnDrivingColumns(onExchangeCoordinates: (value: any) => void): ColumnsType<any> {
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
      dataIndex: 'state'
    },
    {
      title: '地址',
      dataIndex: 'coordinates',
      render: (text, row: any) => {
        return Array.isArray(row.coordinates) ? (
          <a onClick={() => onExchangeCoordinates(row)}>点击查看地址信息{row.coordinates}</a>
        ) : (
          row.coordinates
        );
      }
    }
  ];
}
