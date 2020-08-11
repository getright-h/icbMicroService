import * as React from 'react';
import { IITableProps } from './i-table.interface';
import { useITableStore } from './i-table.component.store';
import { Table } from 'antd';

export default function ITableComponent(props: IITableProps) {
  const {
    isLoading = false,
    data = [],
    columns,
    total,
    isPagination = true,
    rowClick = () => {},
    changeTablePageIndex
  } = props;
  const { state } = useITableStore(props);
  console.log(state.pagination);

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
