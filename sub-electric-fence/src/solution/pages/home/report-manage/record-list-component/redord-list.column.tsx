import * as React from 'react';
import { Tooltip } from 'antd';
import { ModalType } from './redord-list.interface';
export function DwellColumn(callbackAction: Function) {
  const render = (text: any) => (text ? text : '-');

  return [
    {
      title: '车主姓名',
      dataIndex: 'ownerName',
      width: 100,
      render
    },
    {
      title: '车牌号',
      dataIndex: 'plateNo',
      width: 100,
      render
    },
    {
      title: '设备号',
      dataIndex: 'deviceCode',
      width: 150,
      render
    },
    {
      title: '报警类型',
      dataIndex: 'alarmTypeText',
      width: 150,
      render
    },
    {
      title: '报警时间',
      dataIndex: 'time',
      render
    },
    {
      title: '报警说明',
      width: 150,
      dataIndex: 'explain',
      render: (text: string) => {
        const des = text.split('|');
        const _text_ = text.length > 8 ? text.slice(0, 8) + '....' : text;
        return (
          <Tooltip
            title={des.map((_: string, index: number) => (
              <p key={index}>{_}</p>
            ))}
          >
            {_text_}
          </Tooltip>
        );
      }
    },
    {
      title: '报警地址',
      dataIndex: 'address',
      render
    },
    // {
    //   title: '处理状态',
    //   dataIndex: 'time'
    // },
    // {
    //   title: '所属监控组',
    //   dataIndex: 'name'
    // },
    {
      title: '所属机构',
      dataIndex: 'organizationName',
      render
    }
    // {
    //   title: '操作',
    //   fixed: 'right' as 'right',
    //   dataIndex: 'action',
    //   render: (render: any, data: any, index: number) => {
    //     return (
    //       <React.Fragment>
    //         <a onClick={() => callbackAction(ModalType.CREATE, data)}>查看</a>
    //         <Divider type="vertical" />
    //         <a onClick={() => callbackAction(ModalType.EDIT, data)}>处理</a>
    //         <Divider type="vertical" />
    //         <a onClick={() => callbackAction(ModalType.EDIT, data)}>记录</a>
    //       </React.Fragment>
    //     );
    //   }
    // }
  ];
}
