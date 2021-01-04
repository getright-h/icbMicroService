import React from 'react';
import { Divider } from 'antd';
import { ModalType } from './monitor-list.interface';
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
      title: '报警次数',
      dataIndex: 'name'
    },
    {
      title: '设备状态',
      dataIndex: 'name'
    },
    {
      title: '车辆里程',
      dataIndex: 'name'
    },
    {
      title: '最后地址',
      dataIndex: 'deviceCodeList'
    },
    {
      title: '所属监控组',
      dataIndex: 'name'
    },
    {
      title: '所属机构',
      dataIndex: 'name'
    }
  ];
}
