import * as React from 'react';
import { Tag, Tooltip } from 'antd';
import { ModalType } from './follow-list.interface';
import { REPORT_UTIL } from '~/solution/shared/util/report-manage.util';
export function AlarmParameterColumn(callbackAction: Function) {
  const render = (text: any) => (text ? text : '-');

  return [
    {
      title: '车主姓名',
      dataIndex: 'ownerName',
      render,
      ellipsis: true
    },
    {
      title: '车牌号',
      dataIndex: 'plateNo',
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
      render
    },
    // {
    //   title: '设备状态',
    //   dataIndex: 'name'
    // },
    // {
    //   title: '车辆里程',
    //   dataIndex: 'name'
    // },
    {
      title: '报警时间',
      dataIndex: 'createTime',
      width: 200,
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
      title: '经纬度',
      dataIndex: 'lnglat',
      ellipsis: true,
      width: 160,
      render: (text: any, data: any) => REPORT_UTIL.linkToMapWithLnglat(data.longitude, data.latitude)
    },
    {
      title: '最后报警地址',
      dataIndex: 'address',
      width: 400,
      ellipsis: true,
      render
    },
    {
      title: '监控角色',
      dataIndex: 'roleName',
      ellipsis: true,
      width: 150,
      render
    },
    {
      title: '监控组',
      dataIndex: 'groupName',
      render
    },
    {
      title: '所属机构',
      dataIndex: 'organizationName',
      ellipsis: true,
      width: 240,
      render
    },
    {
      title: '处理状态',
      fixed: 'right',
      dataIndex: 'isSettle',
      render: (text: any) => (text ? <Tag color="green">已处理</Tag> : <Tag color="red">未处理</Tag>)
    }
    // {
    //   title: '操作',
    //   dataIndex: 'action',
    //   fixed: 'right' as 'right',
    //   render: (render: any, data: any, index: number) => {
    //     return (
    //       <React.Fragment>
    //         <a onClick={() => callbackAction(ModalType.SLOVE, data)}>处理</a>
    //         <Divider type="vertical" />
    //         <a onClick={() => callbackAction(ModalType.RECORD, data)}>记录</a>
    //       </React.Fragment>
    //     );
    //   }
    // }
  ];
}
