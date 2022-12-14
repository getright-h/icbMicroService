import * as React from 'react';
import { Divider } from 'antd';
import { ACTION_TYPE } from '~/solution/shared/constant/action.const';
export function stationColumns(callbackAction: Function, $auth: Record<string, any>) {
  return [
    {
      title: '围栏名称',
      dataIndex: 'name'
    },
    {
      title: '驶出提醒',
      dataIndex: 'alarmOut',
      render: (text: boolean) => (
        <span>
          {text ? '提醒' : '不提醒'}
          {text}
        </span>
      )
    },
    {
      title: '驶入提醒',
      dataIndex: 'alarmIn',
      render: (text: boolean) => (
        <span>
          {text ? '提醒' : '不提醒'}
          {text}
        </span>
      )
    },
    {
      title: '操作',
      dataIndex: 'action',
      render: (render: any, data: any, index: number) => {
        return (
          <React.Fragment>
            <a
              className={`${$auth['editFence'] ? '' : 'no-auth-link'}`}
              onClick={e => callbackAction(e, ACTION_TYPE.EDIT, data)}
            >
              编辑
            </a>
            <Divider type="vertical" />
            <a
              className={`${$auth['deleteFence'] ? '' : 'no-auth-link'}`}
              onClick={e => callbackAction(e, ACTION_TYPE.DELETE, data)}
            >
              删除
            </a>
          </React.Fragment>
        );
      }
    }
  ];
}
