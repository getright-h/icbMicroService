import { ColumnsType } from 'antd/lib/table';
import React from 'react';
import { Divider } from 'antd';
import { ModalType } from './approval-table.interface';
import { APPROVAL_APPLY_STATUS_ENUM } from '~/solution/shared/constant/common.const';
export function approvalTableColumns(action: Function): ColumnsType<any> {
  return [
    {
      title: '审批状态',
      dataIndex: 'statusText'
    },
    {
      title: '模板类型',
      dataIndex: 'groupName'
    },
    {
      title: '模板名称',
      dataIndex: 'templateName'
    },
    {
      title: '申请人',
      dataIndex: 'creatorName'
    },
    {
      title: '申请时间',
      dataIndex: 'createTime'
    },
    {
      title: '创建机构',
      dataIndex: 'organizationName'
    },
    {
      title: '操作',
      dataIndex: 'action',
      fixed: 'right',
      width: 200,
      render: (text, row) => {
        return (
          <React.Fragment>
            <a onClick={() => action(row, ModalType.DETAIL)}>详情</a>
            {row.status === APPROVAL_APPLY_STATUS_ENUM.Auditing && (
              <React.Fragment>
                <Divider type="vertical" />
                <a onClick={() => action(row, ModalType.WITHDRAW)}>撤回</a>
              </React.Fragment>
            )}
            {row.status === APPROVAL_APPLY_STATUS_ENUM.Audited && (
              <React.Fragment>
                <Divider type="vertical" />
                <a onClick={() => action(row, ModalType.EDIT)}>编辑</a>
              </React.Fragment>
            )}
          </React.Fragment>
        );
      }
    }
  ];
}
