import * as React from 'react';
import { Divider } from 'antd';
import { ModalType } from './redord-list.interface';
export function DwellColumn(callbackAction: Function) {
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
      title: '报警时间',
      dataIndex: 'time',
      render
    },
    {
      title: '报警地址',
      dataIndex: 'address',
      render
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
      dataIndex: 'organizationName',
      render
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
