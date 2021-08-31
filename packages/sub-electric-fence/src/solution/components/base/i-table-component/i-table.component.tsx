import * as React from 'react';
import { IITableProps } from './i-table.interface';
import { useITableStore } from './i-table.component.store';
import { Table } from 'antd';

export default React.memo((props: IITableProps) => {
  const {
    isLoading = false,
    data = [],
    columns,
    size = 'large',
    isPagination = true,
    rowClick = () => {},
    scroll = {},
    expandable = {
      childrenColumnName: 'cool'
    },
    rowSelection,
    showHeader = true,
    sortDirections = null,
    onChange
  } = props;
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
      scroll={scroll}
      showHeader={showHeader}
      size={size}
      dataSource={data}
      rowSelection={rowSelection}
      expandable={expandable}
      onChange={onChange}
      columns={columns}
      sortDirections={sortDirections}
      pagination={isPagination && state.pagination}
      rowKey={(row, index) => row.id || index}
    />
  );
});
