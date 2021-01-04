import React from 'react';
import { Divider } from 'antd';
import { ModalType } from './redord-list.interface';
export function DwellColumn(callbackAction: Function) {
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
      title: '报警时间',
      dataIndex: 'time'
    },
    {
      title: '报警地址',
      dataIndex: 'address'
    },
    // {
    //   title: '处理状态',
    //   dataIndex: 'time'
    // },
    // {
    //   title: '所属监控组',
    //   dataIndex: 'name'
    // },
    {
      title: '所属机构',
      dataIndex: 'organizationName'
    }
    // {
    //   title: '操作',
    //   fixed: 'right' as 'right',
    //   dataIndex: 'action',
    //   render: (render: any, data: any, index: number) => {
    //     return (
    //       <React.Fragment>
    //         <a onClick={() => callbackAction(ModalType.CREATE, data)}>查看</a>
    //         <Divider type="vertical" />
    //         <a onClick={() => callbackAction(ModalType.EDIT, data)}>处理</a>
    //         <Divider type="vertical" />
    //         <a onClick={() => callbackAction(ModalType.EDIT, data)}>记录</a>
    //       </React.Fragment>
    //     );
    //   }
    // }
  ];
}
