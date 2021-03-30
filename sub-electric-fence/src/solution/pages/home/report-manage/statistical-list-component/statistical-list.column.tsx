import * as React from 'react';
import { ModalType } from './statistical-list.interface';
export function AlarmParameterColumn(callbackAction: Function) {
  const render = (text: any) => (text ? text : '-');

  return [
    {
      title: '车主姓名',
      dataIndex: 'ownerName',
      render
    },
    {
      title: '车牌号',
      dataIndex: 'plateNo',
      render
    },
    {
      title: '设备号',
      dataIndex: 'deviceCode',
      render
    },
    {
      title: '报警类型',
      dataIndex: 'alarmTypeText',
      render
    },
    {
      title: '最后报警时间',
      dataIndex: 'time',
      render
    },
    {
      title: '报警次数',
      dataIndex: 'alarmNumber',
      render
    },
    {
      title: '最后报警地址',
      dataIndex: 'address',
      render
    },
    {
      title: '所属机构',
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
            <a onClick={() => callbackAction(ModalType.LOOK, data)}>查看</a>
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
