import React from 'react';
import { Divider } from 'antd';
export function allocationTemplateColumns(callbackAction: Function) {
  return [
    {
      title: '流程名称',
      dataIndex: 'name'
    },
    {
      title: '流程类型',
      dataIndex: 'typeText'
    },
    {
      title: '创建机构',
      dataIndex: 'organizationName'
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
      render: (render: any, data: any, index: number) => {
        return (
          <React.Fragment>
            <a
              onClick={() => {
                callbackAction('详情', data);
              }}
            >
              详情
            </a>
            <Divider type="vertical" />
            <a onClick={() => callbackAction('删除', data)}>删除</a>
          </React.Fragment>
        );
      }
    }
  ];
}
