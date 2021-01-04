import * as React from 'react';
import { Divider } from 'antd';
import { ModalType } from './dwell-list.interface';
export function DwellColumn(callbackAction: Function) {
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
      title: '停留开始时间',
      dataIndex: 'name'
    },
    {
      title: '停留结束时间',
      dataIndex: 'name'
    },
    {
      title: '停留时长',
      dataIndex: 'name'
    },
    {
      title: '地址',
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
