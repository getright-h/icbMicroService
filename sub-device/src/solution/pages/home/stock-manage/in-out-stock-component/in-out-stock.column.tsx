import React from 'react';
import { Divider } from 'antd';
import { ModalType } from './in-out-stock.interface';

export function inOutStockColumns(callbackAction: Function) {
  return [
    {
      title: '仓库名',
      dataIndex: 'storeName'
    },
    {
      title: '方式',
      dataIndex: 'typeText'
    },
    {
      title: '数量',
      dataIndex: 'number'
    },
    {
      title: '操作人',
      dataIndex: 'modifyUserName'
    },
    {
      title: '操作时间',
      dataIndex: 'createTime'
    },
    {
      title: '操作',
      fixed: 'right' as 'right',
      dataIndex: 'action',
      render: (render: any, data: any) => {
        return (
          <React.Fragment>
            <a
              onClick={() => {
                callbackAction(ModalType.RECORD, data);
              }}
            >
              详情
            </a>
            <Divider type="vertical" />
            <a onClick={() => callbackAction(ModalType.DEVICE, data)}>查看设备</a>
          </React.Fragment>
        );
      }
    }
  ];
}
