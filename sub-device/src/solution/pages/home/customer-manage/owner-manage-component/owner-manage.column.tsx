import * as React from 'react';
import { Divider, Table } from 'antd';
import { ModalType } from './owner-manage.interface';
export function ownerManageColumns(callbackAction: Function, $auth: Record<string, boolean>) {
  return [
    {
      title: '姓名',
      dataIndex: 'name'
    },
    {
      title: '电话',
      dataIndex: 'mobile'
    },
    {
      title: '性别',
      dataIndex: 'sexText'
    },
    {
      title: '证件号',
      dataIndex: 'certificateNo'
    },
    {
      title: '关联车辆',
      dataIndex: 'plateNo'
    },
    {
      title: '跟进方式',
      dataIndex: 'followText'
    },
    {
      title: '操作',
      fixed: 'right' as 'right',
      dataIndex: 'action',
      render: (render: any, data: any, index: number) => {
        return (
          <React.Fragment>
            <a
              className={`${$auth['queryOwnerDetail'] ? '' : 'no-auth-link'}`}
              onClick={() => callbackAction(ModalType.DETAIL, data)}
            >
              详情
            </a>
            <Divider type="vertical" />
            <a
              className={`${$auth['editOwner'] ? '' : 'no-auth-link'}`}
              onClick={() => callbackAction(ModalType.EDIT, data)}
            >
              编辑
            </a>
            <Divider type="vertical" />
            <a
              className={`${$auth['deleteOwner'] ? '' : 'no-auth-link'}`}
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

export function ownerManageExpandedRow(row: any) {
  const columns = [
    { title: '车牌', dataIndex: 'number', key: 'number' },
    { title: '车型', dataIndex: 'type', key: 'type' }
  ];
  return (
    row.vehicleInfo && (
      <Table columns={columns} dataSource={[row.vehicleInfo]} pagination={false} rowKey={row => row.number} />
    )
  );
}
