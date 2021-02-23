import * as React from 'react';
import { Divider } from 'antd';
import { ACTION_TYPE } from '~/solution/shared/constant/action.const';
export function stationColumns(callbackAction: Function, $auth: Record<string, any>) {
  return [
    {
      title: '围栏名',
      dataIndex: 'fenceName'
    },
    {
      title: '驶出提醒',
      dataIndex: 'alarmIn',
      render: (data: boolean) => (data ? '是' : '否')
    },
    {
      title: '驶入提醒',
      dataIndex: 'alarmOut',
      render: (data: boolean) => (data ? '是' : '否')
    },
    {
      title: '绑定开始日期',
      dataIndex: 'beginDate'
    },
    {
      title: '绑定结束日期',
      dataIndex: 'endDate'
    },
    {
      title: '绑定车辆所属',
      dataIndex: 'thingName'
    },
    {
      title: '车牌号',
      dataIndex: 'plateNumber'
    },
    {
      title: '车主姓名',
      dataIndex: 'ownerName'
    },
    {
      title: '车主电话',
      dataIndex: 'ownerMobile'
    },
    {
      title: '车架号',
      dataIndex: 'vin'
    },
    {
      title: '操作',
      dataIndex: 'action',
      render: (render: any, data: any, index: number) => {
        return (
          <React.Fragment>
            {/* <a onClick={() => callbackAction(ACTION_TYPE.FENCEMODAL, data)}>围栏模式</a>
            <Divider type="vertical" /> */}
            <a
              onClick={() => callbackAction(ACTION_TYPE.EDIT, data)}
              className={`${$auth['editBindVehicle'] ? '' : 'no-auth-link'}`}
            >
              编辑
            </a>
            <Divider type="vertical" />
            <a
              onClick={() => callbackAction(ACTION_TYPE.UNBIND, data)}
              className={`${$auth['fenceUnbindVehicle'] ? '' : 'no-auth-link'}`}
            >
              解绑
            </a>
            {/* <Divider type="vertical" />
            <a onClick={() => callbackAction(ACTION_TYPE.BATCH_EDIT, data)}>批量修改</a> */}
          </React.Fragment>
        );
      }
    }
  ];
}
