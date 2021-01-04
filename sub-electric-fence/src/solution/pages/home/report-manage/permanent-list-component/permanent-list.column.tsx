import React from 'react';
import { Divider } from 'antd';
import { ModalType } from './permanent-list.interface';
import { IMAP } from '~shared/util/map.util';
import { render } from 'react-dom';

export function AlarmParameterColumn(callbackAction: Function) {
  return [
    {
      title: '车主姓名',
      dataIndex: 'ownerName',
      render: (text: any) => <span>{text || '未绑定'}</span>
    },
    {
      title: '车牌号',
      dataIndex: 'plateNo',
      render: (text: any) => <span>{text || '未绑定'}</span>
    },
    {
      title: '设备号',
      dataIndex: 'deviceCode',
      render: (text: any) => <span>{text || '未绑定'}</span>
    },
    {
      title: '常驻地点',
      dataIndex: 'address'
    },
    {
      title: '到访次数',
      dataIndex: 'stayCount'
    },
    {
      title: '平均停留时间',
      dataIndex: 'stayAvg'
    },
    {
      title: '停留总时常',
      dataIndex: 'stayDuration'
    },
    // {
    //   title: '停留次数',
    //   dataIndex: 'name'
    // },
    // {
    //   title: '地址',
    //   dataIndex: 'deviceCodeList'
    // },
    // {
    //   title: '监控组',
    //   dataIndex: 'time'
    // },
    {
      title: '所属机构',
      dataIndex: 'organizationName',
      render: (text: any) => <span>{text || '未绑定'}</span>
    }
  ];
}
