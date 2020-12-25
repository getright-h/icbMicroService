import { ColumnsType } from 'antd/lib/table';
import * as React from 'react';
import { Divider } from 'antd';
export function wareHouseListColumns(action: Function): ColumnsType<any> {
  return [
    {
      title: '仓位名',
      dataIndex: 'name'
    },
    {
      title: '仓位库存',
      dataIndex: 'stockNumber'
    },
    {
      title: '货架位置',
      dataIndex: 'positionAddress'
    },
    {
      title: '默认仓位',
      dataIndex: 'isDefaultText'
    },
    {
      title: '库存报警',
      dataIndex: 'alarmText',
      render: (text, row) => {
        return <span style={row.alarm != 3 ? { color: 'red' } : {}}>{text}</span>;
      }
    },
    {
      title: '长时报警',
      dataIndex: 'alarmDayText',
      render: (text, row) => {
        return <span style={row.isAlarmDay == 1 ? { color: 'red' } : {}}>{text}</span>;
      }
    },
    {
      title: '操作',
      dataIndex: 'action',
      fixed: 'right',
      width: 200,
      render: (text, row) => {
        return (
          <React.Fragment>
            <a onClick={() => action(row, '编辑')}>编辑</a>
            <Divider type="vertical" />
            <a onClick={() => action(row, '删除')}>删除</a>
          </React.Fragment>
        );
      }
    }
  ];
}
