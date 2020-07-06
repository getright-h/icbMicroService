import { ColumnsType } from 'antd/lib/table';
import * as React from 'react';
import { Button } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import { RoleInfo } from './role-manage.interface';
export function roleColumns(action: Function, roleId: string): ColumnsType<RoleInfo> {
  return [
    {
      title: '角色名称',
      dataIndex: 'name'
    },
    {
      title: '关联权限',
      dataIndex: 'action',
      fixed: 'right',
      render: (text, row) => {
        return (
          <React.Fragment>
            <Button type="primary" disabled={row.id == roleId} onClick={() => action(row.id, row.systemId)}>
              <FormOutlined />
            </Button>
          </React.Fragment>
        );
      }
    }
  ];
}
