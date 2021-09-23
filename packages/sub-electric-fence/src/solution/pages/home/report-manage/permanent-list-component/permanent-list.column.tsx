import * as React from 'react';
import { formatStayTime } from './permanent-list.util';

export function AlarmParameterColumn(sortInfo: { key: string; type: string }, callbackAction: Function) {
  const render = (text: any) => (text ? text : '-');

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
      dataIndex: 'address',
      render,
      ellipsis: true,
      width: 400
    },
    {
      title: '到访次数',
      dataIndex: 'stayCount',
      sorter: (a: any, b: any) => a.stayCount - b.stayCount,
      sortOrder: sortInfo?.key === 'stayCount' && sortInfo?.type
    },
    {
      title: '平均停留时间',
      dataIndex: 'stayAvgText',
      sorter: (a: any, b: any) => a.stayAvg - b.stayAvg,
      sortOrder: sortInfo?.key === 'stayAvgText' && sortInfo?.type
    },
    {
      title: '停留总时长',
      dataIndex: 'stayDurationText',
      sorter: (a: any, b: any) => a.stayDuration - b.stayDuration,
      sortOrder: sortInfo?.key === 'stayDurationText' && sortInfo?.type
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
      render: (text: any) => <span>{text || '未绑定'}</span>,
      ellipsis: true,
      width: 240
    }
  ];
}
