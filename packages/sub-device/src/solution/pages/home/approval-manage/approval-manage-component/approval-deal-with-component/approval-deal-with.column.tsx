import { Divider } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import * as React from 'react';
import { ModalType } from './approval-deal-with.interface';
import { APPROVAL_APPLY_STATUS_ENUM } from '~/solution/shared/constant/common.const';
export function approvalDealWithColumns(action: Function): ColumnsType<any> {
  return [
    {
      title: '处理状态',
      dataIndex: 'audit',
      render: (text, row) => <span>{text.processStatusText}</span>
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
      title: '调拨单名称',
      dataIndex: 'allotName'
    },
    {
      title: '上级备注',
      dataIndex: 'approverRemark'
    },
    {
      title: '操作',
      fixed: 'right' as 'right',
      dataIndex: 'action',
      width: 200,
      render: (text, row) => {
        return (
          <React.Fragment>
            <a onClick={() => action(row, ModalType.DETAIL)}>详情</a>
            {/* {(row.status === APPROVAL_APPLY_STATUS_ENUM.Audited ||
              row.status === APPROVAL_APPLY_STATUS_ENUM.Refused) && (
              <React.Fragment>
                <Divider type="vertical" />
                <a onClick={() => action(row, ModalType.EDIT)}>编辑</a>
              </React.Fragment>
            )} */}
          </React.Fragment>
        );
      }
    }
  ];
}
