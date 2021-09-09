import * as React from 'react';
import { ALLOW_FLOW_ENUM } from '~shared/constant/common.const';
import { ModalType } from '../monitor-manage.const';
import { Space } from 'antd';
export function monitorColumns(callbackAction: Function, $auth: Record<string, boolean>) {
  /**
   * @description 根据[  调拨状态 ] 渲染操作按钮
   */
  function renderOperateBtn(data: any) {
    const { state } = data;

    const btnState = [
      {
        condition: [],
        btn: (
          <a onClick={() => callbackAction(ModalType.DETAIL, data)} key={3}>
            详情
          </a>
        )
      },
      // 删除
      {
        condition: [],
        btn: (
          <a
            className={`${$auth['deleteMonitoringVehicle'] ? '' : 'no-auth-link'}`}
            onClick={() => callbackAction(ModalType.DEL, data)}
            key={2}
          >
            删除
          </a>
        )
      },

      //转组
      {
        condition: [],
        btn: (
          <a
            className={`${$auth['moveVehicleGroup'] ? '' : 'no-auth-link'}`}
            onClick={() => callbackAction(ModalType.BATCH_TRANFROM, data)}
            key={4}
          >
            转组
          </a>
        )
      }
    ];
    const btnArray = btnState.filter((item: any) => item.condition).map((btn: any) => btn.btn);
    return <Space size="small">{btnArray}</Space>;
  }
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
      title: '设备号',
      dataIndex: 'deviceList',
      render: (deviceList: any[], data: any) => {
        return deviceList.length
          ? deviceList.map(device => <div key={device.code}>{`【${device.typeName}】${device.code}`}</div>)
          : '-';
      }
    },
    {
      title: '车架号',
      dataIndex: 'vinNo'
    },
    {
      title: '操作',
      fixed: 'right' as 'right',
      dataIndex: 'action',
      render: (render: any, data: any, index: number) => renderOperateBtn(data)
    }
  ];
}
