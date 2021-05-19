import * as React from 'react';
import { Divider } from 'antd';
import { ModalType } from './offline-list.interface';
export function OfflineListColumn(callbackAction: Function) {
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
      title: '离线时长',
      dataIndex: 'offlineTime'
    },
    {
      title: '最后上线时间',
      dataIndex: 'lastTime'
    },
    {
      title: '地址',
      dataIndex: 'address'
    },
    {
      title: '所属机构',
      dataIndex: 'organizationName'
    }
  ];
}
