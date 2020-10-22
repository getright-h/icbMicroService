import * as React from 'react';
import { IITableProps } from './i-table.interface';
import { useITableStore } from './i-table.component.store';
import { Table } from 'antd';

export default function ITableComponent(props: IITableProps) {
  const {
    isLoading = false,
    data = [],
    columns,
    isPagination = true,
    rowSelection = null,
    rowKey = 'id',
    summary = false,
    expandable = null
  } = props;
  const { state } = useITableStore(props);

  return (
    <Table
      loading={isLoading}
      dataSource={data}
      columns={columns}
      pagination={isPagination && state.pagination}
      rowKey={row => row[rowKey]}
      scroll={{ x: 'max-content' }}
      rowSelection={rowSelection}
      summary={summary}
      expandable={expandable}
    />
  );
}
