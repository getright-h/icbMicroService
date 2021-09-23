import * as React from 'react';
import { Divider } from 'antd';
import { ModalType } from './state-list.interface';
import { DeviceStateEnum } from '~/solution/shared/enums/home.enum';
export function StateListColumn(callbackAction: Function) {
  const render = (text: any) => (text ? text : '-');
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
      dataIndex: 'deviceCode',
      width: 150
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
      width: 180
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
      dataIndex: 'organizationName',
      ellipsis: true,
      width: 240
    },
    {
      title: '地址',
      dataIndex: 'address',
      ellipsis: true,
      width: 400
    }
  ];
}
