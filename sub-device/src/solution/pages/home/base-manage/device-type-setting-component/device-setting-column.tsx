import * as React from 'react';
import { ModalType } from '../base-manage.const';
import { Space } from 'antd';
export function devicetypeColumns(callbackAction: Function, $auth: Record<string, boolean>) {
  const render = (text: any) => (text ? text : '-');
  return [
    {
      title: '设备型号',
      dataIndex: 'name',
      render
    },
    {
      title: '供应商',
      dataIndex: 'supplierName',
      render
    },
    {
      title: '创建人',
      dataIndex: 'creatorName',
      render
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      render
    },
    {
      title: '操作',
      fixed: 'right' as 'right',
      dataIndex: 'action',
      render: (render: any, data: any, index: number) => (
        <Space>
          <a
            className={`${$auth['editDeviceType'] ? '' : 'no-auth-link'}`}
            onClick={() => {
              callbackAction(ModalType.ALERT, data);
            }}
            key={0}
          >
            修改
          </a>
          <a
            className={`${$auth['deleteDeviceType'] ? '' : 'no-auth-link'}`}
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
