import * as React from 'react';
import { ModalType } from '../base-manage.const';
import { Space } from 'antd';
export function sppplierColumns(callbackAction: Function) {
  return [
    {
      title: '供应商',
      dataIndex: 'supplier'
    },
    {
      title: '地址',
      dataIndex: 'address'
    },
    {
      title: '联系人',
      dataIndex: 'contract'
    },
    {
      title: '联系电话',
      dataIndex: 'phone'
    },
    {
      title: '操作',
      fixed: 'right' as 'right',
      dataIndex: 'action',
      render: (render: any, data: any, index: number) => (
        <Space>
          <a
            onClick={() => {
              callbackAction(ModalType.ALERT, data);
            }}
            key={0}
          >
            修改
          </a>
          <a
            onClick={() => {
              callbackAction(ModalType.DEL, data);
            }}
            key={1}
          >
            删除
          </a>
        </Space>
      )
    }
  ];
}
