import * as React from 'react';
import { Divider } from 'antd';
import { ModalType } from './directive-list.interface';
export function AlarmParameterColumn(callbackAction: Function) {
  return [
    {
      title: '设备号',
      dataIndex: 'deviceCode'
    },
    {
      title: '关联车主',
      dataIndex: 'deviceCodeList'
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
      title: '下发人',
      dataIndex: 'userName'
    },
    {
      title: '发送时间',
      dataIndex: 'excuteTime'
    },
    {
      title: '指令状态',
      dataIndex: 'statusText'
    },
    {
      title: '响应时间',
      dataIndex: 'responseTime'
    },
    {
      title: '监控组',
      dataIndex: 'vehicleGroupName'
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
            <Divider type="vertical" />
            <a onClick={() => callbackAction(ModalType.EDIT, data)}>模板列表</a>
          </React.Fragment>
        );
      }
    }
  ];
}
