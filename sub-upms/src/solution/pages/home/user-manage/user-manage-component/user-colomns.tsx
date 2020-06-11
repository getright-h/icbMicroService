import { ColumnsType } from 'antd/lib/table';
import * as React from 'react';
import { Divider } from 'antd';
export const userColumns: ColumnsType<any> = [
  {
    title: '所属机构',
    dataIndex: 'distributor'
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
    dataIndex: 'contactName'
  },
  {
    title: '电话',
    dataIndex: 'contactMobile'
  },
  {
    title: '关联角色',
    dataIndex: 'role'
  },
  {
    title: '用户状态',
    dataIndex: 'status'
  },
  {
    title: '操作',
    dataIndex: 'action',
    render: () => {
      return (
        <React.Fragment>
          <a>详情</a>
          <Divider type="vertical" />
          <a>编辑</a>
          <Divider type="vertical" />
          <a>权限</a>
          <Divider type="vertical" />
          <a>删除</a>
        </React.Fragment>
      );
    }
  }
];
