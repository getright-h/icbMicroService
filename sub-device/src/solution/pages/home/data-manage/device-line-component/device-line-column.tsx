import * as React from 'react';
import { ALLOW_FLOW_ENUM, ModalType } from '~shared/constant/common.const';
export function deviceLineColumns(callbackAction: Function) {
  /**
   * @description 根据[  调拨状态 ] 渲染操作按钮
   */

  function renderOperateBtn(data: any) {
    const flowNode = (
      <a
        className={style.button}
        onClick={() => {
          callbackAction(ModalType.LOOK, data);
        }}
        key={0}
      >
        流程节点
      </a>
    );

    return <React.Fragment>{flowNode}</React.Fragment>;
  }
  return [
    {
      title: '设备号',
      dataIndex: 'owner'
    },
    {
      title: 'SIM卡号',
      dataIndex: 'sim'
    },
    {
      title: '设备型号',
      dataIndex: 'typeName'
    },
    {
      title: '环节',
      dataIndex: 'flow'
    },
    {
      title: '操作',
      fixed: 'right' as 'right',
      dataIndex: 'action',
      render: (render: any, data: any, index: number) => renderOperateBtn(data)
    }
  ];
}
