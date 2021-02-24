import { ColumnsType } from 'antd/lib/table';
import * as React from 'react';
import { Divider, Switch } from 'antd';
import { ModalType } from '~/solution/shared/constant/common.const';
export function approvalTemplateColumns(action: Function, $auth: Record<string, boolean>): ColumnsType<any> {
  return [
    {
      title: '模板类型',
      dataIndex: 'groupName'
    },
    {
      title: '模板名称',
      dataIndex: 'name'
    },
    {
      title: '创建人',
      dataIndex: 'creatorName'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime'
    },
    {
      title: '创建机构',
      dataIndex: 'organizationName'
    },
    {
      title: '是否启动',
      dataIndex: 'state',
      render: (text, row) => {
        return (
          <Switch
            checkedChildren="开启"
            onChange={value => action(row, ModalType.MOVE, value)}
            unCheckedChildren="禁用"
            checked={!!text}
            disabled={!$auth['editApprovalTemplate']}
          />
        );
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
            <a
              className={`${$auth['editApprovalTemplate'] ? '' : 'no-auth-link'}`}
              onClick={() => action(row, ModalType.EDIT)}
            >
              编辑
            </a>
            <Divider type="vertical" />
            <a
              className={`${$auth['deleteApprovalTemplate'] ? '' : 'no-auth-link'}`}
              onClick={() => action(row, ModalType.DELETE)}
            >
              删除
            </a>
          </React.Fragment>
        );
      }
    }
  ];
}
