import * as React from 'react';
export function initAlarmAttentionColumns() {
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
      title: '报警类型',
      dataIndex: 'alarmTypeText'
    },
    {
      title: '报警次数',
      dataIndex: 'alarmNumber'
    },
    {
      title: '最早报警时间',
      dataIndex: 'beginAlarmTime'
    },
    {
      title: '最后报警时间',
      dataIndex: 'endAlarmTime'
    },
    {
      title: '机构',
      dataIndex: 'organizationName'
    },
    {
      title: '状态',
      dataIndex: 'isSettleText'
    }
  ];
}
