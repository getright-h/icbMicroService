import { Table } from 'antd';
import * as React from 'react';
import style from './assign-device-show.component.less';
import { useAssignDeviceShowStore } from './assign-device-show.component.store';
import { IAssignDeviceShowProps } from './assign-device-show.interface';

export default function AssignDeviceShowComponent(props: IAssignDeviceShowProps) {
  const { state } = useAssignDeviceShowStore();
  const columns = [
    {
      title: '设备型号',
      dataIndex: 'typeName',
      key: 'typeName'
    },
    {
      title: '数量',
      dataIndex: 'number',
      key: 'number'
    }
  ];
  return (
    <Table
      style={{ marginBottom: '15px', marginTop: '-16px' }}
      showHeader={false}
      columns={columns}
      pagination={false}
      dataSource={props.data}
    />
  );
}
