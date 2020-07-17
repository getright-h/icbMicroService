import * as React from 'react';
import { Divider } from 'antd';
import { ACTION_TYPE } from '~/solution/shared/constant/action.const';
export function stationColumns(callbackAction: Function) {
  return [
    {
      title: '车辆所属',
      dataIndex: 'source'
    },
    {
      title: '车牌号',
      dataIndex: 'plateNumber'
    },
    {
      title: '车主姓名',
      dataIndex: 'userName'
    },
    {
      title: '车架号',
      dataIndex: 'vin'
    },
    {
      title: '设备号',
      dataIndex: 'equipmentNumber'
    },
    {
      title: '绑定围栏',
      dataIndex: 'bindFence'
    },
    {
      title: '告警信息',
      dataIndex: 'warningMessage'
    },
    {
      title: '告警时间',
      dataIndex: 'warningTime'
    },
    {
      title: '状态',
      dataIndex: 'status'
    },
    {
      title: '操作',
      dataIndex: 'action',
      render: (render: any, data: any, index: number) => {
        return (
          <React.Fragment>
            {data.status == '未处理' && (
              <a
                onClick={() => {
                  console.log(ACTION_TYPE.EDIT), callbackAction(ACTION_TYPE.EDIT, data);
                }}
              >
                跟进
              </a>
            )}
            {data.status == '未处理' && <Divider type="vertical" />}
            <a onClick={() => callbackAction(ACTION_TYPE.DETAIL, data)}>详情</a>
          </React.Fragment>
        );
      }
    }
  ];
}
