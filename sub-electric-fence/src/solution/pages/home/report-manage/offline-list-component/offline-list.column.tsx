import React from 'react';
import { Divider } from 'antd';
import { ModalType } from './offline-list.interface';
export function AlarmParameterColumn(callbackAction: Function) {
  return [
    {
      title: '车主姓名',
      dataIndex: 'vinNo'
    },
    {
      title: '车牌号',
      dataIndex: 'deviceCodeList'
    },
    {
      title: '设备号',
      dataIndex: 'time'
    },
    {
      title: '离线时长',
      dataIndex: 'name'
    },
    {
      title: '最后上线时间',
      dataIndex: 'name'
    },
    {
      title: '地址',
      dataIndex: 'name'
    },
    {
      title: '通讯信号',
      dataIndex: 'deviceCodeList'
    },
    {
      title: '电压',
      dataIndex: 'deviceCodeList'
    },
    {
      title: '监控组',
      dataIndex: 'time'
    },
    {
      title: '所属机构',
      dataIndex: 'name'
    }
  ];
}
