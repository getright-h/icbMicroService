import * as React from 'react';
import { Divider } from 'antd';
import { ModalType } from './allocation-manage.interface';
import { AllOT_STATE_ENUM, AllOT_APPROVAL_STATE_ENUM } from '~shared/constant/common.const';
export function allocationManageColumns(callbackAction: Function) {
  return [
    {
      title: '调拨单号',
      dataIndex: 'inventoryCode'
    },
    {
      title: '流程名称',
      dataIndex: 'name'
    },
    {
      title: '设备详情',
      dataIndex: 'contentList',
      render: (text: any) => {
        if (Array.isArray(text) && text.length) {
          return text.map((item: any, index: number) => (
            <div key={item.typeId}>{`${item.typeName}, ${item.number}个`}</div>
          ));
        } else {
          return '-';
        }
      }
    },
    {
      title: '调拨总数',
      dataIndex: 'totalNumber'
    },
    {
      title: '创建机构',
      dataIndex: 'organizationName'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime'
    },
    {
      title: '创建人',
      dataIndex: 'creatorName'
    },
    {
      title: '调拨状态',
      dataIndex: 'stateText'
    },
    {
      title: '操作',
      fixed: 'right' as 'right',
      dataIndex: 'action',
      render: (render: any, data: any, index: number) => {
        return (
          <React.Fragment>
            <a onClick={() => callbackAction(ModalType.DETAIL, data)}>查看</a>
            <Divider type="vertical" />
            <a
              onClick={() => {
                callbackAction(ModalType.ALLOCATE, data);
              }}
            >
              去调拨
            </a>
            <Divider type="vertical" />
            <a
              onClick={() => {
                callbackAction(ModalType.EDIT, data);
              }}
            >
              修改
            </a>
            <Divider type="vertical" />
            <a onClick={() => callbackAction(ModalType.RECORD, data)}>调拨记录</a>
            <Divider type="vertical" />
            <a onClick={() => callbackAction(ModalType.DELETE, data)}>删除</a>
          </React.Fragment>
        );
      }
    }
  ];

  /**
   * @description 根据[  调拨状态, 审批状态 ] 渲染操作按钮
   */
  function renderOperateBtn(data: any) {
    const { allocaState, approvalState } = data;
    const btnArray = [];
  }
}
