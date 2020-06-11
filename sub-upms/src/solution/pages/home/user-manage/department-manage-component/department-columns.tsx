import { ColumnsType } from 'antd/lib/table';
import * as React from 'react';
import { Divider } from 'antd';
export const departmentColumns: ColumnsType<any> = [
  {
    title: '所属机构',
    dataIndex: 'distributor'
  },
  {
    title: '所属部门',
    dataIndex: 'department'
  },
  {
    title: '部门名称',
    dataIndex: 'station'
  },
  {
    title: '状态',
    dataIndex: 'status'
  },
  {
    title: '说明',
    dataIndex: 'remark'
  },
  {
    title: '操作',
    dataIndex: 'action',
    render: () => {
      return (
        <React.Fragment>
          <a>编辑</a>
          <Divider type="vertical" />
          <a>删除</a>
        </React.Fragment>
      );
    }
  }
];
