import * as React from 'react';
import { ModalType } from '../base-manage.const';
export function carTypeColumns(callbackAction: Function) {
  /**
   * @description 根据[  调拨状态 ] 渲染操作按钮
   */
  return [
    {
      title: '系列',
      dataIndex: 'series'
    },
    {
      title: '车辆信息',
      dataIndex: 'info'
    },
    {
      title: '厂牌型号',
      dataIndex: 'brand'
    },
    {
      title: '车辆颜色',
      dataIndex: 'color'
    },
    {
      title: '添加时间',
      dataIndex: 'createTime'
    },
    {
      title: '操作',
      fixed: 'right' as 'right',
      dataIndex: 'action',
      render: (render: any, data: any, index: number) => (
        <a onClick={() => callbackAction(ModalType.ALERT, data)} key={4}>
          编辑
        </a>
      )
    }
  ];
}
