import * as React from 'react';
import { Divider } from 'antd';
import { ModalType } from './receive-allocation.interface';
export function receiveAllocationColumns(callbackAction: Function) {
  return [
    {
      title: '调拨单号',
      dataIndex: 'orderNum'
    },
    {
      title: '目标仓库',
      dataIndex: 'target'
    },
    {
      title: '设备型号',
      dataIndex: 'type'
    },
    {
      title: '调拨总数',
      dataIndex: 'total'
    },
    {
      title: '调拨时间',
      dataIndex: 'createTime'
    },
    {
      title: '操作人',
      dataIndex: 'creater'
    },
    {
      title: '状态',
      dataIndex: 'status'
    },
    {
      title: '操作',
      fixed: 'right' as 'right',
      dataIndex: 'action',
      render: (render: any, data: any, index: number) => {
        return (
          <React.Fragment>
            <a
              onClick={() => {
                callbackAction(ModalType.DETAIL, data);
              }}
            >
              查看
            </a>
            <Divider type="vertical" />
            <a onClick={() => callbackAction(ModalType.DELETE, data)}>发起申请</a>
            <Divider type="vertical" />
            <a onClick={() => callbackAction(ModalType.DELETE, data)}>待确认</a>
            <Divider type="vertical" />
            <a onClick={() => callbackAction(ModalType.DELETE, data)}>重新申请</a>
            <Divider type="vertical" />
            <a onClick={() => callbackAction(ModalType.DELETE, data)}>撤回</a>
            <Divider type="vertical" />
            <a onClick={() => callbackAction(ModalType.DELETE, data)}>收到退货</a>
          </React.Fragment>
        );
      }
    }
  ];
}
