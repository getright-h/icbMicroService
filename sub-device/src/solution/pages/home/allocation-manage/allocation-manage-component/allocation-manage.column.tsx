import * as React from 'react';
import { Divider } from 'antd';
import { ModalType } from './allocation-manage.interface';
export function allocationManageColumns(callbackAction: Function) {
  return [
    {
      title: '调拨单号',
      dataIndex: 'orderNum'
    },
    {
      title: '流程名称',
      dataIndex: 'name'
    },
    {
      title: '设备详情',
      dataIndex: 'detail'
    },
    {
      title: '调拨总数',
      dataIndex: 'total'
    },
    {
      title: '创建机构',
      dataIndex: 'org'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime'
    },
    {
      title: '创建人',
      dataIndex: 'creater'
    },
    {
      title: '调拨状态',
      dataIndex: 'status'
    },
    {
      title: '操作',
      fixed: 'right' as 'right',
      dataIndex: 'action',
      render: (render: any, data: any, index: number) => {
        return (
          <React.Fragment>
            <a onClick={() => callbackAction(ModalType.DETAIL, data)}>查看</a>
            <Divider type="vertical" />
            <a
              onClick={() => {
                callbackAction(ModalType.ALLOCATE, data);
              }}
            >
              去调拨
            </a>
            <Divider type="vertical" />
            <a
              onClick={() => {
                callbackAction(ModalType.EDIT, data);
              }}
            >
              修改
            </a>
            <Divider type="vertical" />
            <a onClick={() => callbackAction(ModalType.RECORD, data)}>调拨记录</a>
            <Divider type="vertical" />
            <a onClick={() => callbackAction(ModalType.DELETE, data)}>删除</a>
          </React.Fragment>
        );
      }
    }
  ];
}
