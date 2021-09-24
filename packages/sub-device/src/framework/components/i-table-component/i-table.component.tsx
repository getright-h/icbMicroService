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
    size = 'large',
    summary = false,
    expandable = null,
    scroll = { x: 'max-content' },
    multRowkey = [] // 此参数用于在设置table cell 唯一key的时候, 防止传入的rowkey 不是唯一值,导致控制台警告,故而增加多个rowkey 进行设置
  } = props;
  const { state } = useITableStore(props);

  return (
    <Table
      loading={isLoading}
      dataSource={data}
      columns={columns}
      pagination={isPagination && state.pagination}
      rowKey={(row: any) => (!multRowkey.length ? row[rowKey] : multRowkey.map((key: string) => row[key]).join(''))}
      scroll={scroll}
      rowSelection={rowSelection}
      summary={summary}
      size={size}
      expandable={expandable}
    />
  );
}
