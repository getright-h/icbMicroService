import { ColumnsType } from 'antd/lib/table';
import * as React from 'react';
import { Divider } from 'antd';
import { OrganizationTableData } from './organization-manage.interface';
export function organizationColumns(action: Function): ColumnsType<OrganizationTableData> {
  return [
    // {
    //   title: '机构类型',
    //   dataIndex: 'typeName'
    // },
    {
      title: '机构全称',
      dataIndex: 'name'
    },
    {
      title: '机构简称',
      dataIndex: 'shorterName',
      render: (text, row) => <span>{row.extendAttributionModel.shorterName}</span>
    },
    {
      title: '上级机构',
      dataIndex: 'parentName',
      render: (text, row) => <span>{row.parentName || '-'}</span>
    },
    {
      title: '联系人',
      dataIndex: 'contactName',
      render: (text, row) => <span>{row.extendAttributionModel.contactName}</span>
    },
    {
      title: '联系电话',
      dataIndex: 'contactMobile',
      render: (text, row) => <span>{row.extendAttributionModel.contactMobile}</span>
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
