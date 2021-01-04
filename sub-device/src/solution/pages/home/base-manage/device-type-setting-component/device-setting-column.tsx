import React from 'react';
import { ModalType } from '../base-manage.const';
import { Space } from 'antd';
export function devicetypeColumns(callbackAction: Function) {
  return [
    {
      title: '设备型号',
      dataIndex: 'name'
    },
    {
      title: '供应商',
      dataIndex: 'supplierName'
    },
    {
      title: '创建人',
      dataIndex: 'creatorName'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime'
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
