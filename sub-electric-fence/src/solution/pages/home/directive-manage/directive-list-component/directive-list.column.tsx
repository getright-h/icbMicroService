import React from 'react';
import { Divider } from 'antd';
import { ModalType } from './directive-list.interface';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { render } from 'react-dom';

export function AlarmParameterColumn(callbackAction: Function) {
  return [
    {
      title: '设备号',
      dataIndex: 'deviceCode'
    },
    {
      title: '关联车主',
      dataIndex: 'ownerName'
    },
    {
      title: '关联车牌',
      dataIndex: 'plateNumber'
    },
    {
      title: '指令类型',
      dataIndex: 'cmdName'
    },
    {
      title: '发送时间',
      dataIndex: 'time',
      render: (text: any) => (text && typeof text == 'number' ? moment(text).format('YYYY-MM-DD HH:mm:ss') : '-')
    },
    {
      title: '响应时间',
      dataIndex: 'responseTime'
    },
    {
      title: '指令状态',
      dataIndex: 'statusText'
    },
    {
      title: '返回时间',
      dataIndex: 'responseTime'
    },
    {
      title: '创建人',
      dataIndex: 'userName'
    },
    {
      title: '创建机构',
      dataIndex: 'organizationName'
    },
    {
      title: '操作',
      fixed: 'right' as 'right',
      dataIndex: 'action',
      render: (render: any, data: any, index: number) => {
        return (
          <React.Fragment>
            <a onClick={() => callbackAction(ModalType.CREATE, data)}>查看</a>
          </React.Fragment>
        );
      }
    }
  ];
}
