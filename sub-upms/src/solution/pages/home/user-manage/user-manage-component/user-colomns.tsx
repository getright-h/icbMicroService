import { ColumnsType } from 'antd/lib/table';
import * as React from 'react';
import { Divider } from 'antd';
export function userColumns(action: Function): ColumnsType<any> {
  return [
    {
      title: '所属机构',
      dataIndex: 'organizationName'
    },
    {
      title: '部门',
      dataIndex: 'department'
    },
    {
      title: '岗位',
      dataIndex: 'station'
    },
    {
      title: '账号',
      dataIndex: 'account'
    },
    {
      title: '姓名',
      dataIndex: 'name'
    },
    {
      title: '电话',
      dataIndex: 'telephone'
    },
    {
      title: '关联角色',
      dataIndex: 'rolesCodeList',
      render: (text, row) => {
        return row.rolesCodeList.map((item: { name: string }) => item.name).join(' ');
      }
    },
    {
      title: '用户状态',
      dataIndex: 'state',
      render: text => {
        return text ? '启用' : '禁用';
      }
    },
    {
      title: '操作',
      dataIndex: 'action',
      fixed: 'right',
      render: (text, row) => {
        return (
          <React.Fragment>
            <a>详情</a>
            <Divider type="vertical" />
            <a>编辑</a>
            <Divider type="vertical" />
            <a onClick={() => action('权限', row)}>权限</a>
            <Divider type="vertical" />
            <a onClick={() => action('删除', row)}>删除</a>
          </React.Fragment>
        );
      }
    }
  ];
}
