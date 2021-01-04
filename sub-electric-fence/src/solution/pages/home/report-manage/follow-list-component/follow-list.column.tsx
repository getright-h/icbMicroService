import React from 'react';
import { Divider } from 'antd';
import { ModalType } from './follow-list.interface';
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
      title: '报警类型',
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
      title: '报警时间',
      dataIndex: 'deviceCodeList'
    },
    {
      title: '报警地址',
      dataIndex: 'time'
    },
    {
      title: '处理状态',
      dataIndex: 'name'
    },
    {
      title: '所属监控组',
      dataIndex: 'name'
    },
    {
      title: '所属机构',
      dataIndex: 'name'
    },
    {
      title: '操作',
      dataIndex: 'action',
      fixed: 'right' as 'right',
      render: (render: any, data: any, index: number) => {
        return (
          <React.Fragment>
            <a onClick={() => callbackAction(ModalType.SLOVE, data)}>处理</a>
            <Divider type="vertical" />
            <a onClick={() => callbackAction(ModalType.RECORD, data)}>记录</a>
          </React.Fragment>
        );
      }
    }
  ];
}
