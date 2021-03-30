import * as React from 'react';
import { Space } from 'antd';
import { APPROVAL_FLOW_STATUS_ENUM, AllOT_STATE_ENUM, ModalType } from '~shared/constant/common.const';
export function allocationManageColumns(callbackAction: Function, $auth: Record<string, boolean>) {
  function renderOperateBtn(data: any) {
    const { state, approvalState } = data;
    const btn = [];
    const detailBtn = () => (
      <a
        className={`${$auth['detailAllot'] ? '' : 'no-auth-link'}`}
        onClick={() => {
          callbackAction(ModalType.SEE, data);
        }}
        key={0}
      >
        详情
      </a>
    );

    const delBtn = () => (
      <a
        className={`${$auth['deleteAllot'] ? '' : 'no-auth-link'}`}
        onClick={() => {
          callbackAction(ModalType.DELETE, data);
        }}
        key={1}
      >
        删除
      </a>
    );
    const goToAllocate = () => (
      <a
        className={`${$auth['operationAllot'] ? '' : 'no-auth-link'}`}
        onClick={() => {
          callbackAction(ModalType.ALLOCATE, data);
        }}
        key={2}
      >
        去调拨
      </a>
    );
    btn.push(...[detailBtn()]);
    if (state == AllOT_STATE_ENUM.NOT_ALLOT && approvalState == APPROVAL_FLOW_STATUS_ENUM.Refused) {
      btn.push(delBtn);
    }
    if (state == AllOT_STATE_ENUM.NOT_ALLOT && approvalState == APPROVAL_FLOW_STATUS_ENUM.Success) {
      btn.push(...[goToAllocate(), delBtn()]);
    }
    // if (state == AllOT_STATE_ENUM.HAD_ALLOT && approvalState == APPROVAL_FLOW_STATUS_ENUM.Success) {
    //   btn.push(...[detailBtn]);
    // }
    // if (state == AllOT_STATE_ENUM.HAD_ALLOT && approvalState == APPROVAL_FLOW_STATUS_ENUM.Audited) {
    //   btn.push(...[detailBtn]);
    // }
    return btn;
  }

  return [
    {
      title: '调拨单号',
      dataIndex: 'inventoryCode'
    },
    {
      title: '模板名称',
      dataIndex: 'name'
    },
    {
      title: '设备详情',
      dataIndex: 'contentList',
      render: (text: any) => {
        if (Array.isArray(text) && text.length) {
          return text.map((item: any, index: number) => (
            <div key={item.typeId + index}>{`${item.typeName}, ${item.number}个`}</div>
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
      title: '审批状态',
      dataIndex: 'approvalStateText'
    },
    {
      title: '操作',
      fixed: 'right' as 'right',
      dataIndex: 'action',
      render: (render: any, data: any, index: number) => <Space size={'small'}>{renderOperateBtn(data)}</Space>
    }
  ];
}
