import * as React from 'react';
import style from './monitor-manage.component.less';
import { ALLOW_FLOW_ENUM, ModalType } from '~shared/constant/common.const';
export function monitorColumns(callbackAction: Function) {
  /**
   * @description 根据[  调拨状态 ] 渲染操作按钮
   */
  function renderOperateBtn(data: any) {
    const { state } = data;

    const btnState = [
      // 删除
      {
        condition: [],
        btn: (
          <a className={style.button} onClick={() => callbackAction(ModalType.REJECT, data)} key={2}>
            删除
          </a>
        )
      },

      // 通过操作 & 退货操作
      {
        condition: [ALLOW_FLOW_ENUM.Inspection],
        btn: (
          <a className={style.button} onClick={() => callbackAction(ModalType.SET_RETURN, data)} key={4}>
            转组
          </a>
        )
      }
    ];
    const btnArray = btnState.filter((item: any) => item.condition.includes(state)).map((btn: any) => btn.btn);
    return <React.Fragment>{btnArray}</React.Fragment>;
  }
  return [
    {
      title: '车主',
      dataIndex: 'owner'
    },
    {
      title: '电话',
      dataIndex: 'phone'
    },
    {
      title: '设备号',
      dataIndex: 'deviceCode'
    },
    {
      title: '车架号',
      dataIndex: 'totalNUmber'
    },
    {
      title: '操作',
      fixed: 'right' as 'right',
      dataIndex: 'action',
      render: (render: any, data: any, index: number) => renderOperateBtn(data)
    }
  ];
}
