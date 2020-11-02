import { ColumnsType } from 'antd/lib/table';
import * as React from 'react';
import { Divider, Switch } from 'antd';
export function approvalTableColumns(action: Function): ColumnsType<any> {
  return [
    {
      title: '审批状态',
      dataIndex: 'name'
    },
    {
      title: '模板类型',
      dataIndex: 'stockNumber'
    },
    {
      title: '模板名称',
      dataIndex: 'positionAddress'
    },
    {
      title: '申请人',
      dataIndex: 'isDefaultText'
    },
    {
      title: '申请时间',
      dataIndex: 'positionAddress'
    },
    {
      title: '创建机构',
      dataIndex: 'positionAddress'
    },

    {
      title: '操作',
      dataIndex: 'action',
      fixed: 'right',
      width: 200,
      render: (text, row) => {
        return (
          <React.Fragment>
            <a onClick={() => action(row, '详情')}>编辑</a>
            <Divider type="vertical" />
            <a onClick={() => action(row, '撤回')}>删除</a>
          </React.Fragment>
        );
      }
    }
  ];
}
