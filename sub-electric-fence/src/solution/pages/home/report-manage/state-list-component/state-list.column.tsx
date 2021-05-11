import * as React from 'react';
import { Divider } from 'antd';
import { ModalType } from './state-list.interface';
export function StateListColumn(callbackAction: Function) {
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
      title: '状态',
      dataIndex: 'name'
    },
    {
      title: '运行模式',
      dataIndex: 'name'
    },
    {
      title: '最后上线时间',
      dataIndex: 'name'
    },
    {
      title: '地址',
      dataIndex: 'deviceCodeList'
    },
    {
      title: 'GPS信号',
      dataIndex: 'time'
    },
    {
      title: '电压',
      dataIndex: 'name'
    },
    {
      title: '监控组',
      dataIndex: 'name'
    },
    {
      title: '所属机构',
      dataIndex: 'name'
    }
  ];
}
