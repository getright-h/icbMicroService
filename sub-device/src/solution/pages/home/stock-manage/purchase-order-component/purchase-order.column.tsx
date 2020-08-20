import * as React from 'react';
import { Divider } from 'antd';
import { ModalType } from './purchase-order.interface';
export function purchaseOrderColumns(callbackAction: Function) {
  return [
    {
      title: '机构名',
      dataIndex: 'orgName'
    },
    {
      title: '采购单号',
      dataIndex: 'orderNum'
    },
    {
      title: '采购单名称',
      dataIndex: 'orderName'
    },
    {
      title: '采购商品',
      dataIndex: 'product'
    },
    {
      title: '采购总数',
      dataIndex: 'total'
    },
    {
      title: '采购金额',
      dataIndex: 'amount'
    },
    {
      title: '采购时间',
      dataIndex: 'createTime'
    },
    {
      title: '创建人',
      dataIndex: 'creater'
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
                callbackAction(ModalType.DETAIL, data);
              }}
            >
              详情
            </a>
            <Divider type="vertical" />
            <a onClick={() => callbackAction(ModalType.EDIT, data)}>编辑</a>
            <Divider type="vertical" />
            <a onClick={() => callbackAction(ModalType.DELETE, data)}>删除</a>
          </React.Fragment>
        );
      }
    }
  ];
}
