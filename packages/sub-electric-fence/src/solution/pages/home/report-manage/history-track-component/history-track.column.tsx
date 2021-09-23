import React from 'react';

export function HistoryTrackColumn(action?: Function) {
  const render = (text: any) => (text ? text : '-');
  return [
    {
      title: '时间',
      dataIndex: 'time',
      render
    },
    {
      title: '经纬度定位',
      dataIndex: 'coordinate',
      render: (text: any, row: any) => <span>{row.longitude + ',' + row.latitude}</span>
    },
    {
      title: '基站',
      dataIndex: 'baseStation',
      render
    },
    {
      title: '定位方式',
      dataIndex: 'positionStyle',
      render
    },
    {
      title: '速度',
      dataIndex: 'speed'
    },
    {
      title: '设备状态',
      dataIndex: 'statusText',
      render
    },
    {
      title: '车辆状态',
      dataIndex: 'vehicleStatus',
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
      render
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
