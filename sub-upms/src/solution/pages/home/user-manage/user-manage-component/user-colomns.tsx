import { ColumnsType } from 'antd/lib/table';
import React from 'react';
import { Divider } from 'antd';
import { UserTableData } from './user-manage.interface';
import PopoverUserInfoComponent from './widget/popover-user-info-component/popover-user-info.component';
import style from './user-manage.component.less';

export function userColumns(action: Function): ColumnsType<UserTableData> {
  return [
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
      title: '所属机构',
      dataIndex: 'organizationList',
      render: (arr: any, row: any) =>
        arr.map((org: any) => (
          <p className={style.orgRow} key={row.name + org.id}>
            {org.name}
          </p>
        ))
    },
    {
      title: '详细所属信息',
      dataIndex: 'rolesCodeList',
      width: 150,
      render: (text, row) => {
        return <PopoverUserInfoComponent userId={row.id} key={`${row.id}pop`} />;
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
      width: 300,
      render: (text, row) => {
        return (
          <React.Fragment>
            <a onClick={() => action('详情', row)}>详情</a>
            <Divider type="vertical" />
            <a onClick={() => action('编辑', row)}>编辑</a>
            <Divider type="vertical" />
            <a onClick={() => action('修改密码', row)}>修改密码</a>
            <Divider type="vertical" />
            <a onClick={() => action('重置密码', row)}>重置密码</a>
            <Divider type="vertical" />
            <a onClick={() => action('删除', row)}>删除</a>
          </React.Fragment>
        );
      }
    }
  ];
}
