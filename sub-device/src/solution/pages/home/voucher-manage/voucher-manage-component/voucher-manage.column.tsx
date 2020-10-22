import * as React from 'react';
import { Divider } from 'antd';
import { ModalType } from './voucher-manage.interface';
export function voucherManageColumns(callbackAction: Function) {
  return [
    {
      title: '车架号',
      dataIndex: 'vehicleFrameNumber'
    },
    {
      title: '关联设备',
      dataIndex: 'deviceList',
      render: (list: any) => {
        return list.map((device: any) => device.name).join('，');
      }
    },
    {
      title: '安装时间',
      dataIndex: 'createTime'
    },
    {
      title: '安装工',
      dataIndex: 'creater'
    },
    {
      title: '状态',
      dataIndex: 'status'
    },
    {
      title: '操作',
      fixed: 'right' as 'right',
      dataIndex: 'action',
      render: (render: any, data: any, index: number) => {
        return (
          <React.Fragment>
            <a onClick={() => callbackAction(ModalType.DETAIL, data)}>详情</a>
            <Divider type="vertical" />
            <a onClick={() => callbackAction(ModalType.EDIT, data)}>编辑</a>
            <Divider type="vertical" />
            <a onClick={() => callbackAction(ModalType.DELETE, data)}>删除</a>
          </React.Fragment>
        );
      }
    }
  ];
}
