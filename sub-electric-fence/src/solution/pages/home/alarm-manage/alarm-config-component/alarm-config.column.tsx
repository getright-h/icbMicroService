import * as React from 'react';
import { Divider } from 'antd';
import { ModalType } from './alarm-config.interface';

export function AlarmConfigColumn(callbackAction: Function) {
  return [
    {
      title: '报警模板',
      dataIndex: 'tempName'
    },
    {
      title: '设备数',
      dataIndex: 'number'
    },
    {
      title: '监管人',
      dataIndex: 'supervisor'
    },
    {
      title: '推送方式',
      dataIndex: 'type'
    },
    {
      title: '创建人',
      dataIndex: 'creator'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime'
    },
    {
      title: '操作',
      dataIndex: 'action',
      fixed: 'right' as 'right',
      render: (render: any, data: any, index: number) => {
        return (
          <React.Fragment>
            <a onClick={() => callbackAction(ModalType.EDIT, data)}>查看</a>
          </React.Fragment>
        );
      }
    }
  ];
}
