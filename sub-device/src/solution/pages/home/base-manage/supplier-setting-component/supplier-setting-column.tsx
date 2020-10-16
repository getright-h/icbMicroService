import * as React from 'react';
import { ModalType } from '~shared/constant/common.const';
import style from './supplier-setting.component.less';
export function sppplierColumns(callbackAction: Function) {
  /**
   * @description 根据[  调拨状态 ] 渲染操作按钮
   */

  function renderOperateBtn(data: any) {
    const flowNode = (
      <div>
        <a
          className={style.button}
          onClick={() => {
            callbackAction(ModalType.LOOK, data);
          }}
          key={0}
        >
          修改
        </a>
        <a
          className={style.button}
          onClick={() => {
            callbackAction(ModalType.LOOK, data);
          }}
          key={1}
        >
          删除
        </a>
      </div>
    );

    return <React.Fragment>{flowNode}</React.Fragment>;
  }
  return [
    {
      title: '供应商',
      dataIndex: 'supplier'
    },
    {
      title: '地址',
      dataIndex: 'address'
    },
    {
      title: '联系人',
      dataIndex: 'contract'
    },
    {
      title: '联系电话',
      dataIndex: 'phone'
    },
    {
      title: '操作',
      fixed: 'right' as 'right',
      dataIndex: 'action',
      render: (render: any, data: any, index: number) => renderOperateBtn(data)
    }
  ];
}
