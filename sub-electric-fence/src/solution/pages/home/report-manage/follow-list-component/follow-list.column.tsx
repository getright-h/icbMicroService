import * as React from 'react';
import { Tag } from 'antd';
import { ModalType } from './follow-list.interface';
export function AlarmParameterColumn(callbackAction: Function) {
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
    // {
    //   title: '设备状态',
    //   dataIndex: 'name'
    // },
    // {
    //   title: '车辆里程',
    //   dataIndex: 'name'
    // },
    {
      title: '报警时间',
      dataIndex: 'createTime'
    },
    {
      title: '报警地址',
      dataIndex: 'address'
    },
    {
      title: '监控角色',
      dataIndex: 'roleName'
    },
    {
      title: '监控组',
      dataIndex: 'groupName'
    },
    {
      title: '所属机构',
      dataIndex: 'organizationName'
    },
    {
      title: '处理状态',
      dataIndex: 'isSettle',
      render: (text: any) => (text ? <Tag color="green">已处理</Tag> : <Tag color="red">未处理</Tag>)
    }
    // {
    //   title: '操作',
    //   dataIndex: 'action',
    //   fixed: 'right' as 'right',
    //   render: (render: any, data: any, index: number) => {
    //     return (
    //       <React.Fragment>
    //         <a onClick={() => callbackAction(ModalType.SLOVE, data)}>处理</a>
    //         <Divider type="vertical" />
    //         <a onClick={() => callbackAction(ModalType.RECORD, data)}>记录</a>
    //       </React.Fragment>
    //     );
    //   }
    // }
  ];
}
