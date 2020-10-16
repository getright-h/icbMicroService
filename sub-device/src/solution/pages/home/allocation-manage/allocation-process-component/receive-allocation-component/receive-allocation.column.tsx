import * as React from 'react';
import style from './receive-allocation.component.less';
import { ALLOW_FLOW_ENUM, ModalType } from '~shared/constant/common.const';
export function receiveAllocationColumns(callbackAction: Function) {
  /**
   * @description 根据[  调拨状态 ] 渲染操作按钮
   */
  function renderOperateBtn(data: any) {
    const { state } = data;
    // const state = 70;
    const lookAllot = (
      <a
        className={style.button}
        onClick={() => {
          callbackAction(ModalType.LOOK, data);
        }}
        key={0}
      >
        查看
      </a>
    );
    /**
     * 1.仓库属于节点中，存在流转，出现流转按钮
     * 2.仓库处于流程最末端，不会显示你流转按钮
     */
    const moveAllot = (
      <a
        className={style.button}
        onClick={() => {
          callbackAction(ModalType.MOVE, data);
        }}
        key={0}
      >
        流转
      </a>
    );
    if (!state) {
      return lookAllot;
    }
    const btnState = [
      // 驳回操作 & 接收操作
      {
        condition: [ALLOW_FLOW_ENUM.Confirm],
        btn: (
          <div key={'Confirm'} style={{ display: 'inline-block' }}>
            <a className={style.button} onClick={() => callbackAction(ModalType.REJECT, data)} key={2}>
              驳回
            </a>
            <a className={style.button} onClick={() => callbackAction(ModalType.RECIVE, data)} key={1}>
              接收
            </a>
          </div>
        )
      },

      // 通过操作 & 退货操作
      {
        condition: [ALLOW_FLOW_ENUM.Inspection],
        btn: (
          <div key={'Inspection'} style={{ display: 'inline-block' }}>
            <a className={style.button} onClick={() => callbackAction(ModalType.PASS, data)} key={3}>
              通过
            </a>
            <a className={style.button} onClick={() => callbackAction(ModalType.SET_RETURN, data)} key={4}>
              退货
            </a>
          </div>
        )
      }
    ];
    const btnArray = btnState.filter((item: any) => item.condition.includes(state)).map((btn: any) => btn.btn);
    // 插入查看操作
    btnArray.unshift(lookAllot);
    return <React.Fragment>{btnArray}</React.Fragment>;
  }
  return [
    {
      title: '调拨单号',
      dataIndex: 'allotCode'
    },
    {
      title: '发起仓库',
      dataIndex: 'storeName'
    },
    {
      title: '设备型号',
      dataIndex: 'deviceTypeList',
      render: (text: any) => {
        if (Array.isArray(text) && text.length) {
          return text.map((item: any, index: number) => <div key={index}>{`${item.typeName}, ${item.number}个`}</div>);
        } else {
          return '-';
        }
      }
    },
    {
      title: '调拨总数',
      dataIndex: 'totalNUmber'
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
