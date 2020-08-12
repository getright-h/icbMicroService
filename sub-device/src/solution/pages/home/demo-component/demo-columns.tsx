import * as React from 'react';
import { ColumnsType } from 'antd/lib/table';
import { Divider } from 'antd';

export function demoColumns(action: Function): ColumnsType<any> {
  return [
    {
      title: '字段1',
      dataIndex: 'keyword1'
    },
    {
      title: '字段2',
      dataIndex: 'keyword2'
    },
    {
      title: '字段3',
      dataIndex: 'keyword3'
    },
    {
      title: '字段4',
      dataIndex: 'keyword4'
    },
    {
      title: '操作',
      dataIndex: 'action',
      fixed: 'right',
      width: 200,
      render: (text, row) => {
        return (
          <React.Fragment>
            <a onClick={() => action(row, '详情')}>详情</a>
            <Divider type="vertical" />
            <a onClick={() => action(row, '编辑')}>编辑</a>
            <Divider type="vertical" />
            <a onClick={() => action(row, '删除')}>删除</a>
          </React.Fragment>
        );
      }
    }
  ];
}
