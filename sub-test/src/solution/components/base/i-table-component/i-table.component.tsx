import * as React from 'react';
import { IITableProps } from './i-table.interface';
import { useITableStore } from './i-table.component.store';
import { Table } from 'antd';

export default function ITableComponent(props: IITableProps) {
  const {isLoding = false, data = new Array(), columns, isPagination = true} = props;
  const {state} = useITableStore(props);
  
  return <Table loading={isLoding} dataSource={data} columns={columns} pagination={isPagination && state.pagination}/>;
}
