import * as React from 'react';
import style from './vehicle-manage.component.less';
import { Divider, Table } from 'antd';
import { ModalType } from './vehicle-manage.interface';
import { CloseCircleOutlined } from '@ant-design/icons';
export function vehicleManageColumns(callbackAction: Function, $auth: Record<string, boolean>) {
  return [
    {
      title: '车主',
      dataIndex: 'ownerName'
    },
    {
      title: '电话',
      dataIndex: 'ownerMobile'
    },
    {
      title: '车牌号',
      dataIndex: 'plateNo'
    },
    {
      title: '车架号',
      dataIndex: 'vinNo'
    },
    {
      title: '设备号',
      dataIndex: 'deviceList',
      render: (deviceList: any[], data: any) => {
        return deviceList.length
          ? deviceList.map(device => (
              <div key={device.code}>
                {`【${device.typeName}】${device.code}`}
                {$auth['unBindingOperation'] ? (
                  <CloseCircleOutlined
                    className={style.deleteDevice}
                    onClick={() => callbackAction(ModalType.UNBIND, { code: device.code, id: data.id })}
                  />
                ) : (
                  <CloseCircleOutlined style={{ marginLeft: '10px', cursor: 'not-allowed', opacity: 0.5 }} />
                )}
              </div>
            ))
          : '-';
      }
    },
    {
      title: '类型',
      dataIndex: 'typeText'
    },
    {
      title: '车型',
      dataIndex: 'versionName'
    },
    {
      title: '经销商',
      dataIndex: 'distributorName'
    },
    {
      title: '金融公司',
      dataIndex: 'financeName'
    },
    {
      title: '安装时间',
      dataIndex: 'buyTime'
    },
    {
      title: '服务开始时间',
      dataIndex: 'serverBeginTime'
    },
    {
      title: '服务到期时间',
      dataIndex: 'serverEndTime'
    },
    {
      title: '操作',
      fixed: 'right' as 'right',
      dataIndex: 'action',
      render: (render: any, data: any, index: number) => {
        return (
          <React.Fragment>
            <a
              className={`${$auth['detailVehicle'] ? '' : 'no-auth-link'}`}
              onClick={() => callbackAction(ModalType.DETAIL, data)}
            >
              详情
            </a>
            <Divider type="vertical" />
            <a
              className={`${$auth['deleteVehicle'] ? '' : 'no-auth-link'}`}
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
