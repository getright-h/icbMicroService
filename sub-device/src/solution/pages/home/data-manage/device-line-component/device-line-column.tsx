import * as React from 'react';
export function deviceLineColumns(getFlowNode: Function) {
  /**
   * @description 根据[  调拨状态 ] 渲染操作按钮
   */
  return [
    {
      title: '设备号',
      dataIndex: 'code'
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
      dataIndex: 'routeName'
    },
    {
      title: '操作',
      fixed: 'right' as 'right',
      dataIndex: 'action',
      render: (render: any, data: any, index: number) => (
        <a
          onClick={() => {
            getFlowNode(data);
          }}
          key={0}
        >
          流程节点
        </a>
      )
    }
  ];
}
