import * as React from 'react';
import { Divider } from 'antd';
import { ACTION_TYPE } from '~/solution/shared/constant/action.const';
export function stationColumns(callbackAction: Function) {
  return [
    {
      title: '围栏名',
      dataIndex: 'fenceName'
    },
    {
      title: '驶出提醒',
      dataIndex: 'alarmIn',
      render: (data: boolean) => <a>{data ? '是' : '否'}</a>
    },
    {
      title: '驶入提醒',
      dataIndex: 'alarmOut',
      render: (data: boolean) => <a>{data ? '是' : '否'}</a>
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
      dataIndex: 'groupName'
    },
    {
      title: '车牌号',
      dataIndex: 'plateNumber'
    },
    {
      title: '车主姓名',
      dataIndex: 'ownerName'
    },
    // {
    //   title: '设备号',
    //   dataIndex: 'vehicleId'
    // },
    {
      title: '操作',
      dataIndex: 'action',
      render: (render: any, data: any, index: number) => {
        return (
          <React.Fragment>
            <a onClick={() => callbackAction(ACTION_TYPE.FENCEMODAL, data)}>围栏模式</a>
            <Divider type="vertical" />
            <a onClick={() => callbackAction(ACTION_TYPE.EDIT, data)}>编辑</a>
            <Divider type="vertical" />
            <a onClick={() => callbackAction(ACTION_TYPE.UNBIND, data)}>解绑</a>
            <Divider type="vertical" />
            <a onClick={() => callbackAction(ACTION_TYPE.BATCH_EDIT, data)}>批量修改</a>
          </React.Fragment>
        );
      }
    }
  ];
}
