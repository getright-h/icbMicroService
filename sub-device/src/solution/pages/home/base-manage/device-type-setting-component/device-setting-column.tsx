import * as React from 'react';
import { ModalType } from '~shared/constant/common.const';
import { Space } from 'antd';
export function devicetypeColumns(callbackAction: Function) {
  return [
    {
      title: '设备型号',
      dataIndex: 'deviceType'
    },
    {
      title: '供应商',
      dataIndex: 'supplier'
    },
    {
      title: '创建人',
      dataIndex: 'creator'
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
              callbackAction(ModalType.LOOK, data);
            }}
            key={0}
          >
            修改
          </a>
          <a
            onClick={() => {
              callbackAction(ModalType.LOOK, data);
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
