import * as React from 'react';
import { Divider } from 'antd';
import { ModalType } from './alarm-parameter.interface';
export function AlarmParameterColumn(callbackAction: Function) {
  return [
    {
      title: '报警类型',
      dataIndex: 'vinNo'
    },
    {
      title: '参数说明',
      dataIndex: 'deviceCodeList'
    },
    {
      title: '下发方式',
      dataIndex: 'time'
    },
    {
      title: '支持自定义',
      dataIndex: 'name'
    },
    {
      title: '最后修改时间',
      dataIndex: 'name'
    },
    {
      title: '操作人',
      dataIndex: 'name'
    },
    {
      title: '操作',
      fixed: 'right' as 'right',
      dataIndex: 'action',
      render: (render: any, data: any, index: number) => {
        return (
          <React.Fragment>
            <a onClick={() => callbackAction(ModalType.CREATE, data)}>新增</a>
            <Divider type="vertical" />
            <a onClick={() => callbackAction(ModalType.EDIT, data)}>模板列表</a>
          </React.Fragment>
        );
      }
    }
  ];
}
