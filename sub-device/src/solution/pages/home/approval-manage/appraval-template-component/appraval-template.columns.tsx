import { ColumnsType } from 'antd/lib/table';
import * as React from 'react';
import { Divider, Switch } from 'antd';
export function approvalTemplateColumns(action: Function): ColumnsType<any> {
  return [
    {
      title: '模板类型',
      dataIndex: 'name'
    },
    {
      title: '模板名称',
      dataIndex: 'name'
    },
    {
      title: '创建人',
      dataIndex: 'stockNumber'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime'
    },
    {
      title: '创建机构',
      dataIndex: 'createTime'
    },
    {
      title: '是否启动',
      dataIndex: 'state',
      render: text => {
        return <Switch checkedChildren="开启" unCheckedChildren="禁用" checked={!!text} />;
      }
    },
    {
      title: '操作',
      dataIndex: 'action',
      fixed: 'right',
      width: 200,
      render: (text, row) => {
        return (
          <React.Fragment>
            <a onClick={() => action(row, '编辑')}>编辑</a>
            <Divider type="vertical" />
            <a onClick={() => action(row, '删除')}>删除</a>
          </React.Fragment>
        );
      }
    }
  ];
}
