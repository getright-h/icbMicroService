import * as React from 'react';
import { IITableProps } from './i-table.interface';
import { useITableStore } from './i-table.component.store';
import { Table } from 'antd';

export default function ITableComponent(props: IITableProps) {
  const { isLoading = false, data = [], columns, isPagination = true, rowClick } = props;
  const { state } = useITableStore(props);

  return (
    <Table
      loading={isLoading}
      onRow={record => {
        return {
          onClick: event => {
            rowClick(record, event);
          } // 点击行
        };
      }}
      dataSource={data}
      columns={columns}
      pagination={isPagination && state.pagination}
      rowKey={row => row.id}
    />
  );
}
