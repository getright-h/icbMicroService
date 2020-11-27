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
    size = 'large',
    isPagination = true,
    rowClick = () => {},
    expandable,
    rowSelection,
    showHeader = true,
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
      showHeader={showHeader}
      size={size}
      dataSource={data}
      rowSelection={rowSelection}
      expandable={expandable}
      columns={columns}
      pagination={isPagination && state.pagination}
      rowKey={row => row.id}
    />
  );
}
