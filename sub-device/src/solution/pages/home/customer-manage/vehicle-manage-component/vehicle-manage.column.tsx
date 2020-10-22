import * as React from 'react';
import style from './vehicle-manage.component.less';
import { Divider, Table } from 'antd';
import { ModalType } from './vehicle-manage.interface';
import { CloseCircleOutlined } from '@ant-design/icons';
export function vehicleManageColumns(callbackAction: Function) {
  return [
    {
      title: '车主',
      dataIndex: 'owner'
    },
    {
      title: '电话',
      dataIndex: 'phone'
    },
    {
      title: '车牌号',
      dataIndex: 'vehicleNumber'
    },
    {
      title: '车架号',
      dataIndex: 'vehicleFrameNumber'
    },
    {
      title: '设备号',
      dataIndex: 'deviceList',
      render: (deviceList: any[]) => {
        return deviceList.map(device => (
          <div key={device.code}>
            {device.code}
            <CloseCircleOutlined
              className={style.deleteDevice}
              onClick={() => callbackAction(ModalType.UNBIND, device)}
            />
          </div>
        ));
      }
    },
    {
      title: '车型',
      dataIndex: 'vehicleType'
    },
    {
      title: '经销商',
      dataIndex: 'distributor'
    },
    {
      title: '金融公司',
      dataIndex: 'financial'
    },
    {
      title: '安装时间',
      dataIndex: 'installTime'
    },
    {
      title: '服务开始时间',
      dataIndex: 'startTime'
    },
    {
      title: '服务到期时间',
      dataIndex: 'endTime'
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
            <a onClick={() => callbackAction(ModalType.DELETE, data)}>删除</a>
          </React.Fragment>
        );
      }
    }
  ];
}

export function vehicleManageExpandedRow(row: any) {
  const columns = [
    { title: '设备号', dataIndex: 'code' },
    { title: '设备类型', dataIndex: 'type' },
    { title: '是否在线', dataIndex: 'online' },
    { title: '运动状态', dataIndex: 'active' },
    { title: '最后上线时间', dataIndex: 'onlineTime' },
    { title: '报警信息', dataIndex: 'warning' }
  ];
  return (
    row.deviceList && (
      <Table size="small" columns={columns} dataSource={row.deviceList} pagination={false} rowKey={row => row.id} />
    )
  );
}
