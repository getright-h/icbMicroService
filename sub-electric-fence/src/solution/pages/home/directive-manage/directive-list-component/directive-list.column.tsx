import * as React from 'react';
import { Divider } from 'antd';
import { ModalType } from './directive-list.interface';
export function AlarmParameterColumn(callbackAction: Function) {
  return [
    {
      title: '设备号',
      dataIndex: 'vinNo'
    },
    {
      title: '关联车主',
      dataIndex: 'deviceCodeList'
    },
    {
      title: '关联车牌',
      dataIndex: 'time'
    },
    {
      title: '指令类型',
      dataIndex: 'name'
    },
    {
      title: '下发人',
      dataIndex: 'name'
    },
    {
      title: '发送时间',
      dataIndex: 'name'
    },
    {
      title: '指令状态',
      dataIndex: 'deviceCodeList'
    },
    {
      title: '响应时间',
      dataIndex: 'time'
    },
    {
      title: '监控组',
      dataIndex: 'name'
    },
    {
      title: '创建人',
      dataIndex: 'name'
    },
    {
      title: '创建机构',
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
            <a onClick={() => callbackAction(ModalType.EDIT, data)}>模板列表</a>
          </React.Fragment>
        );
      }
    }
  ];
}
