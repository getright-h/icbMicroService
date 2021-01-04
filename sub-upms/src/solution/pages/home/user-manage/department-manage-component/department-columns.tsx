import { ColumnsType } from 'antd/lib/table';
import * as React from 'react';
import { Divider } from 'antd';
export function departmentColumns(action: Function): ColumnsType<any> {
  return [
    {
      title: '所属机构',
      dataIndex: 'parentOrganizationName'
    },
    {
      title: '所属部门',
      dataIndex: 'parentDepartmentName',
      render: text => text || '无'
    },
    {
      title: '部门名称',
      dataIndex: 'name'
    },
    {
      title: '状态',
      dataIndex: 'state',
      render: text => (text ? '启用' : '禁用')
    },
    {
      title: '说明',
      dataIndex: 'instruction',
      render: text => text || '无'
    },
    {
      title: '操作',
      dataIndex: 'action',
      render: (text, row) => {
        return (
          <React.Fragment>
            <a onClick={() => action('编辑', row)}>编辑</a>
            <Divider type="vertical" />
            <a onClick={() => action('删除', row)}>删除</a>
          </React.Fragment>
        );
      }
    }
  ];
}
