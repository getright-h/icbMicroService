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
      dataIndex: 'typeName'
    },
    {
      title: '设备号',
      dataIndex: 'code'
    },
    {
      title: 'SIM卡号',
      dataIndex: 'sim'
    },
    {
      title: '采购单',
      dataIndex: 'purchaseName',
      render: (text: any) => <span>{text || '-'}</span>
    },
    {
      title: '所属仓位',
      dataIndex: 'storePositionName'
    },
    {
      title: '入库时间',
      dataIndex: 'createTime'
    },
    {
      title: '在库时长',
      dataIndex: 'duration'
    },
    {
      title: '设备状态',
      dataIndex: 'stateText'
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
            <Popover content={() => renderActionContent(data)} placement="bottom" trigger="click">
              <a>移除设备</a>
            </Popover>
          </React.Fragment>
        );
      }
    }
  ];
}
