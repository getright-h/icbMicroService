import * as React from 'react';
import { Divider } from 'antd';
import { ModalType } from './state-list.interface';
export function StateListColumn(callbackAction: Function) {
  return [
    {
      title: '车主姓名',
      dataIndex: 'ownerName'
    },
    {
      title: '车牌号',
      dataIndex: 'plateNo'
    },
    {
      title: '设备号',
      dataIndex: 'deviceCode'
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (text: number) => (text ? '在线' : '离线')
    },
    {
      title: '运行模式',
      dataIndex: 'runMode'
    },
    {
      title: '最后上线时间',
      dataIndex: 'statusTime'
    },
    {
      title: '地址',
      dataIndex: 'address'
    },
    {
      title: 'GPS信号',
      dataIndex: 'satelliteStatus'
    },
    {
      title: '电压',
      dataIndex: 'voltage'
    },
    {
      title: '所属机构',
      dataIndex: 'organizationName'
    }
  ];
}
