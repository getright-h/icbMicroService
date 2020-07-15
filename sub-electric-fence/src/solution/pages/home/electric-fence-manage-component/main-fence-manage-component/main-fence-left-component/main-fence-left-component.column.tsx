import * as React from 'react';
import { Divider } from 'antd';
import { ACTION_TYPE } from '~/solution/shared/constant/action.const';
export function stationColumns(callbackAction: Function) {
  return [
    {
      title: '围栏名称',
      dataIndex: 'name'
    },
    {
      title: '驶出提醒',
      dataIndex: 'alarmOut',
      render: (text: boolean) => <span>{text ? '提醒' : '不提醒'}</span>
    },
    {
      title: '驶入提醒',
      dataIndex: 'alarmIn',
      render: (text: boolean) => <span>{text ? '提醒' : '不提醒'}</span>
    },
    {
      title: '操作',
      dataIndex: 'action',
      render: (render: any, data: any, index: number) => {
        return (
          <React.Fragment>
            <a onClick={() => callbackAction(ACTION_TYPE.EDIT, data)}>编辑</a>
            <Divider type="vertical" />
            <a onClick={() => callbackAction(ACTION_TYPE.DELETE, data)}>删除</a>
          </React.Fragment>
        );
      }
    }
  ];
}
