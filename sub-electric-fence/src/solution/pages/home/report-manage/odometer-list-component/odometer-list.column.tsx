import React from 'react';
import { Divider } from 'antd';
import { ModalType } from './odometer-list.interface';
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
      title: '行驶里程',
      dataIndex: 'name'
    },
    {
      title: '行驶时长',
      dataIndex: 'name'
    },
    {
      title: '最高时速',
      dataIndex: 'name'
    },
    {
      title: '时间范围',
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
