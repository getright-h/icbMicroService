import * as React from 'react';
import style from './init-allocation.component.less';
import { ALLOW_FLOW_ENUM, ModalType, APPROVAL_FLOW_STATUS_ENUM } from '~shared/constant/common.const';

export function initAllocationColumns(callbackAction: Function, $auth: Record<string, boolean>) {
  /**
   * @description 根据[  调拨状态 ] 渲染操作按钮
   */
  function renderOperateBtn(data: any) {
    const { state, isRecipientReCallAudit = false, approvalState } = data;
    const lookAllot = (
      <a
        className={style.button}
        onClick={() => {
          callbackAction(ModalType.DETAIL, data);
        }}
        key={'look'}
      >
        查看
      </a>
    );
    if (!state) {
      return lookAllot;
    }
    const btnState = [
      // 发起申请操作
      {
        condition: [ALLOW_FLOW_ENUM.Apply],
        btn:
          APPROVAL_FLOW_STATUS_ENUM.Success === approvalState ? (
            <a
              className={style.button + `${$auth['applyAllot'] ? '' : ' no-auth-link'}`}
              onClick={() => callbackAction(ModalType.CREATE, data)}
              key={'repally'}
            >
              发起申请
            </a>
          ) : null
      },

      // 撤销操作
      {
        condition: [ALLOW_FLOW_ENUM.Confirm],
        btn:
          APPROVAL_FLOW_STATUS_ENUM.Success === approvalState ? (
            <>
              <a className={style.button} onClick={() => callbackAction(ModalType.REVOKE, data)} key={'reject'}>
                撤销
              </a>
            </>
          ) : null
      },

      // 重新申请操作
      {
        condition: [ALLOW_FLOW_ENUM.Recall, ALLOW_FLOW_ENUM.Reject, ALLOW_FLOW_ENUM.Return],
        btn: (
          <a className={style.button} onClick={() => callbackAction(ModalType.REAPPLY, data)} key={'reRepaly'}>
            重新申请
          </a>
        )
      },

      // 收到退货操作
      {
        condition: [ALLOW_FLOW_ENUM.Returning],
        btn: !isRecipientReCallAudit && (
          <a className={style.button} onClick={() => callbackAction(ModalType.RETURN, data)} key={'return'}>
            收到退货
          </a>
        )
      },

      // 收到申请
      {
        condition: [
          ALLOW_FLOW_ENUM.Returning,
          ALLOW_FLOW_ENUM.Inspection,
          ALLOW_FLOW_ENUM.Reject,
          ALLOW_FLOW_ENUM.Identification
        ],
        btn: isRecipientReCallAudit && (
          <a
            className={`${style.button} ${style.getApproval}`}
            onClick={() => callbackAction(ModalType.ROLLBACK, data)}
            key={'getRepaly'}
          >
            收到申请
          </a>
        )
      }
      //
    ];
    const btnArray = btnState.filter((item: any) => item.condition.includes(state)).map((btn: any) => btn.btn);
    // 插入查看操作
    btnArray.unshift(lookAllot);
    // 查看操作 在[发起申请]不存在
    // state == ALLOW_FLOW_ENUM.Apply && btnArray.shift();

    return <React.Fragment>{btnArray}</React.Fragment>;
  }
  return [
    {
      title: '调拨单号',
      dataIndex: 'allotCode'
    },
    {
      title: '目标仓库',
      dataIndex: 'storeName'
    },
    {
      title: '设备型号',
      dataIndex: 'deviceTypeList',
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
      title: '调拨时间',
      dataIndex: 'createTime'
    },
    {
      title: '操作人',
      dataIndex: 'operationName'
    },
    {
      title: '状态',
      dataIndex: 'stateText'
    },
    {
      title: '操作',
      fixed: 'right' as 'right',
      dataIndex: 'action',
      render: (render: any, data: any, index: number) => renderOperateBtn(data)
    }
  ];
}
