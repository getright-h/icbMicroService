import * as React from 'react';
import { Divider } from 'antd';
import { ModalType } from './permanent-list.interface';
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
      title: '常驻地点',
      dataIndex: 'name'
    },
    {
      title: '停留总时常',
      dataIndex: 'name'
    },
    {
      title: '停留次数',
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
