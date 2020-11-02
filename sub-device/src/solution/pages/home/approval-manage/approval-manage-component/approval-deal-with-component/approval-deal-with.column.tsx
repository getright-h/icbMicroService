import * as React from 'react';
import { ModalType } from './approval-deal-with.interface';
export function approvalDealWithColumns(callbackAction: Function) {
  return [
    {
      title: '处理状态',
      dataIndex: 'userName'
    },
    {
      title: '模板类型',
      dataIndex: 'createTime'
    },
    {
      title: '模板名称',
      dataIndex: 'status'
    },
    {
      title: '申请人',
      dataIndex: 'status'
    },
    {
      title: '申请时间',
      dataIndex: 'status'
    },
    {
      title: '创建机构',
      dataIndex: 'status'
    },
    {
      title: '上级备注',
      dataIndex: 'status'
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
