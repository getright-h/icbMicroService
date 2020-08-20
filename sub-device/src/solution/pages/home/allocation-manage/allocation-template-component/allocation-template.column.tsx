import * as React from 'react';
import { Divider } from 'antd';
import { ModalType } from './allocation-template.interface';
export function allocationTemplateColumns(callbackAction: Function) {
  return [
    {
      title: '流程名称',
      dataIndex: 'name'
    },
    {
      title: '流程类型',
      dataIndex: 'type'
    },
    {
      title: '创建机构',
      dataIndex: 'org'
    },
    {
      title: '创建人',
      dataIndex: 'creater'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime'
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
                callbackAction(ModalType.EDIT, data);
              }}
            >
              详情
            </a>
            <Divider type="vertical" />
            <a onClick={() => callbackAction(ModalType.DELETE, data)}>删除</a>
          </React.Fragment>
        );
      }
    }
  ];
}
