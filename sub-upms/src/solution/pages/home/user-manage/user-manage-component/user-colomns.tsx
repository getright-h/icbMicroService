import { ColumnsType } from 'antd/lib/table';
import * as React from 'react';
import { Divider } from 'antd';
import { UserTableData } from './user-manage.interface';
import PopoverUserInfoComponent from './widget/popover-user-info-component/popover-user-info.component';
export function userColumns(action: Function): ColumnsType<UserTableData> {
  return [
    {
      title: '用户所属',
      dataIndex: 'rolesCodeList',
      width: 100,
      render: (text, row) => {
        return <PopoverUserInfoComponent userId={row.id} key={`${row.id}pop`} />;
      }
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
      width: 200,
      render: (text, row) => {
        return (
          <React.Fragment>
            <a onClick={() => action('详情', row)}>详情</a>
            <Divider type="vertical" />
            <a onClick={() => action('编辑', row)}>编辑</a>
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
