import * as React from 'react';
import { ModalType } from './approval-deal-with.interface';
export function approvalDealWithColumns(callbackAction: Function) {
  return [
    {
      title: '处理状态',
      dataIndex: 'processStatusText'
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
      title: '上级备注',
      dataIndex: 'approverRemark',
      render: (render: any) => <span>{render.remark}</span>
    },
    {
      title: '操作',
      fixed: 'right' as 'right',
      dataIndex: 'action',
      render: (render: any, data: any, index: number) => {
        return (
          <React.Fragment>
            <a
              onClick={() => {
                callbackAction(ModalType.EDIT, data);
              }}
            >
              详情
            </a>
          </React.Fragment>
        );
      }
    }
  ];
}
