import * as React from 'react';
import { Divider } from 'antd';
import { ModalType } from './voucher-manage.interface';
export function voucherManageColumns(callbackAction: Function, $auth: Record<string, boolean>) {
  return [
    {
      title: '车架号',
      dataIndex: 'vinNo'
    },
    {
      title: '关联设备',
      dataIndex: 'deviceCodeList',
      render: (list: any) => {
        return list.map((device: any) => `${device.deviceCode}（${device.typeName}）`).join('，');
      }
    },
    {
      title: '安装时间',
      dataIndex: 'time'
    },
    {
      title: '安装工',
      dataIndex: 'name'
    },
    {
      title: '操作',
      fixed: 'right' as 'right',
      dataIndex: 'action',
      render: (render: any, data: any, index: number) => {
        return (
          <React.Fragment>
            <a
              className={`${$auth['detailDispatch'] ? '' : 'no-auth-link'}`}
              onClick={() => callbackAction(ModalType.DETAIL, data)}
            >
              详情
            </a>
            <Divider type="vertical" />
            <a
              className={`${$auth['editDispatch'] ? '' : 'no-auth-link'}`}
              onClick={() => callbackAction(ModalType.EDIT, data)}
            >
              编辑
            </a>
            <Divider type="vertical" />
            <a
              className={`${$auth['deleteDispatch'] ? '' : 'no-auth-link'}`}
              onClick={() => callbackAction(ModalType.DELETE, data)}
            >
              删除
            </a>
          </React.Fragment>
        );
      }
    }
  ];
}
