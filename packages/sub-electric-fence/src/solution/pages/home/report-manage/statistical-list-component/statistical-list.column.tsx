import * as React from 'react';
import { ModalType } from './statistical-list.interface';
import { Tooltip } from 'antd';
export function StatisticalListColumn(callbackAction: Function) {
  const render = (text: any) => (text ? text : '-');

  return [
    {
      title: '车主姓名',
      dataIndex: 'ownerName',
      render
    },
    {
      title: '车牌号',
      dataIndex: 'plateNo',
      render
    },
    {
      title: '设备号',
      dataIndex: 'deviceCode',
      render,
      width: 150
    },
    {
      title: '报警类型',
      dataIndex: 'alarmTypeText',
      render
    },
    {
      title: '最后报警时间',
      dataIndex: 'time',
      render,
      width: 200
    },
    {
      title: '报警次数',
      dataIndex: 'alarmNumber',
      render
    },
    {
      title: '报警说明',
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
      title: '最后报警地址',
      dataIndex: 'address',
      ellipsis: true,
      width: 400
    },
    {
      title: '所属机构',
      dataIndex: 'organizationName',
      render,
      // render: (text: string) => (
      //   <Tooltip title={text}>{text && text.length > 6 ? text.slice(0, 5) + '...' : text}</Tooltip>
      // ),
      ellipsis: true,
      width: 240
    },
    {
      title: '操作',
      fixed: 'right',
      dataIndex: 'action',
      width: 80,
      render: (render: any, data: any, index: number) => {
        return (
          <React.Fragment>
            <a onClick={() => callbackAction(ModalType.LOOK, data)}>查看</a>
            {/* <Divider type="vertical" />
            <a onClick={() => callbackAction(ModalType.EDIT, data)}>处理</a>
            <Divider type="vertical" />
            <a onClick={() => callbackAction(ModalType.EDIT, data)}>记录</a> */}
          </React.Fragment>
        );
      }
    }
  ];
}
