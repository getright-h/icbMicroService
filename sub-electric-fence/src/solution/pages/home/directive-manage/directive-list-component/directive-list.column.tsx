import * as React from 'react';
import { ModalType } from './directive-list.interface';
import moment from 'moment';
import 'moment/locale/zh-cn';

export function AlarmParameterColumn(callbackAction: Function) {
  const render = (text: any) => (text ? text : '-');
  return [
    {
      title: '设备号',
      dataIndex: 'deviceCode',
      render
    },
    {
      title: '关联车主',
      dataIndex: 'ownerName',
      render
    },
    {
      title: '关联车牌',
      dataIndex: 'plateNumber',
      render
    },
    {
      title: '指令类型',
      dataIndex: 'cmdName',
      render
    },
    {
      title: '发送时间',
      dataIndex: 'time',
      render: (text: any) => (text && typeof text == 'number' ? moment(text).format('YYYY-MM-DD HH:mm:ss') : '-')
    },
    {
      title: '响应时间',
      dataIndex: 'responseTime',
      render: (text: any) => (text && typeof text == 'number' ? moment(text).format('YYYY-MM-DD HH:mm:ss') : '-')
    },
    {
      title: '指令状态',
      dataIndex: 'statusText',
      render
    },
    {
      title: '返回值',
      dataIndex: 'response',
      render
    },
    {
      title: '创建人',
      dataIndex: 'userName',
      render
    },
    {
      title: '创建机构',
      dataIndex: 'organizationName',
      render
    },
    {
      title: '操作',
      fixed: 'right' as 'right',
      dataIndex: 'action',
      render: (render: any, data: any, index: number) => {
        return (
          <React.Fragment>
            <a onClick={() => callbackAction(ModalType.DEL, data)}>删除</a>
            {/* <Divider type="vertical" />
            <a onClick={() => callbackAction(ModalType.EDIT, data)}>处理</a>
            <Divider type="vertical" />
            <a onClick={() => callbackAction(ModalType.EDIT, data)}>记录</a> */}
          </React.Fragment>
        );
      }
    }
  ];
}
