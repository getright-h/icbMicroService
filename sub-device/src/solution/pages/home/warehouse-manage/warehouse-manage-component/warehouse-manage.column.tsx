import * as React from 'react';
import { Divider } from 'antd';
import { ModalType } from './warehouse-manage.interface';
export function warehouseManageColumns(callbackAction: Function) {
  return [
    {
      title: '仓位名',
      dataIndex: 'name'
    },
    {
      title: '仓位库存',
      dataIndex: 'stock'
    },
    {
      title: '货架位置',
      dataIndex: 'location'
    },
    {
      title: '默认仓位',
      dataIndex: 'isDefault',
      render: (text: boolean) => (text ? '是' : '否')
    },
    {
      title: '库存报警',
      dataIndex: 'stockWarn'
    },
    {
      title: '长时报警',
      dataIndex: 'longWarn'
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
                callbackAction(ModalType.EDIT, data);
              }}
            >
              设置
            </a>
            <Divider type="vertical" />
            <a onClick={() => callbackAction(ModalType.DELETE, data)}>删除</a>
          </React.Fragment>
        );
      }
    }
  ];
}
