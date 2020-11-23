import * as React from 'react';
import { Divider } from 'antd';
import { ModalType } from './statistical-list.interface';
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
      title: '所属机构',
      dataIndex: 'name'
    },
    {
      title: '报警时间',
      dataIndex: 'name'
    },
    {
      title: '报警地址',
      dataIndex: 'deviceCodeList'
    },
    {
      title: '处理状态',
      dataIndex: 'time'
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
      fixed: 'right' as 'right',
      dataIndex: 'action',
      render: (render: any, data: any, index: number) => {
        return (
          <React.Fragment>
            <a onClick={() => callbackAction(ModalType.CREATE, data)}>查看</a>
            <Divider type="vertical" />
            <a onClick={() => callbackAction(ModalType.EDIT, data)}>处理</a>
            <Divider type="vertical" />
            <a onClick={() => callbackAction(ModalType.EDIT, data)}>记录</a>
          </React.Fragment>
        );
      }
    }
  ];
}
