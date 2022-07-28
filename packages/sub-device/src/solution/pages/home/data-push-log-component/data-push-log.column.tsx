import * as React from 'react';
import { Divider, Table } from 'antd';
import { ModalType } from '~/solution/shared/constant/common.const';
export function dataPushColumns(callbackAction: Function) {
  return [
    {
      title: '来源名称',
      dataIndex: 'originName'
    },
    {
      title: '车架号',
      dataIndex: 'vinNo'
    },
    {
      title: '用户名称',
      dataIndex: 'name'
    },
    {
      title: '用户电话',
      dataIndex: 'mobile'
    },
    {
      title: '经销商名称',
      dataIndex: 'organizationName'
    },
    {
      title: '金融公司名称',
      dataIndex: 'financeName'
    },
    {
      title: '是否推送',
      dataIndex: 'isSendMsg',
      render: (render: any, data: any, index: number) => {
        return (
          <React.Fragment>
            <span>{data.isSendMsg ? '是' : '否'}</span>
          </React.Fragment>
        );
      }
    },
    {
      title: '错误信息',
      dataIndex: 'errorMsg'
    },
    {
      title: '操作',
      fixed: 'right' as 'right',
      dataIndex: 'action',
      render: (render: any, data: any, index: number) => {
        return (
          <React.Fragment>
            <a onClick={() => callbackAction(ModalType.DETAIL, data)}>详情</a>
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
