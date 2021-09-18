import { ColumnsType } from 'antd/lib/table';
import * as React from 'react';
import { Divider } from 'antd';
import { StationTableData } from './station-manage.interface';
export function stationColumns(action: Function): ColumnsType<StationTableData> {
  return [
    {
      title: '所属机构',
      dataIndex: 'parentOrganizationName'
    },
    {
      title: '所属部门',
      dataIndex: 'parentDepartmentName'
    },
    {
      title: '岗位名称',
      dataIndex: 'name'
    },
    {
      title: '所属角色',
      dataIndex: 'roleList',
      render: text => {
        const role: Array<string> = [];
        text && text.map((item: { name: string }) => role.push(item.name));
        return role.join('，') || '无';
      }
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
            {/* <Divider type="vertical" />
            <a onClick={() => action('权限', row)}>权限</a> */}
            <Divider type="vertical" />
            <a onClick={() => action('删除', row)}>删除</a>
          </React.Fragment>
        );
      }
    }
  ];
}
