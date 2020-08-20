import * as React from 'react';
import { Divider, Popover } from 'antd';
import { ModalType } from './stock-manage.interface';

export function stockManageColumns(callbackAction: Function) {
  function renderActionContent(data: any) {
    return (
      <div>
        <a onClick={() => callbackAction(ModalType.DELETE, data)}>直接删除</a>
        <p></p>
        <a onClick={() => callbackAction(ModalType.LOST, data)}>遗失</a>
      </div>
    );
  }
  return [
    {
      title: '设备型号',
      dataIndex: 'type'
    },
    {
      title: '设备号',
      dataIndex: 'number'
    },
    {
      title: 'SIM卡号',
      dataIndex: 'card'
    },
    {
      title: '采购单',
      dataIndex: 'list'
    },
    {
      title: '所属仓位',
      dataIndex: 'location'
    },
    {
      title: '入库时间',
      dataIndex: 'createTime'
    },
    {
      title: '在库时长',
      dataIndex: 'stayTime'
    },
    {
      title: '设备状态',
      dataIndex: 'status'
    },
    {
      title: '操作',
      fixed: 'right' as 'right',
      dataIndex: 'action',
      render: (render: any, data: any) => {
        return (
          <React.Fragment>
            <a
              onClick={() => {
                callbackAction(ModalType.EDIT, data);
              }}
            >
              详情
            </a>
            <Divider type="vertical" />
            <Popover content={(data: any) => renderActionContent(data)} placement="bottom" trigger="click">
              <a>移除设备</a>
            </Popover>
          </React.Fragment>
        );
      }
    }
  ];
}
