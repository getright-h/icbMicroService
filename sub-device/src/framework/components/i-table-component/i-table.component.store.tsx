import { IITableState, IITableProps } from './i-table.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect } from 'react';
import * as React from 'react';

export function useITableStore(props: IITableProps) {
  const { state, setStateWrap } = useStateStore(new IITableState());
  useEffect(() => {
    const { pageIndex = 1, pageSize = 10, total = 0, changeTablePageIndex } = props;
    const pagination = {
      current: pageIndex,
      showQuickJumper: true,
      showSizeChanger: true,
      // onShowSizeChange: changeTablePageIndex,
      showTotal: (total: number) => {
        return <div>共 {total} 条</div>;
      },
      pageSize,
      total,
      onChange: changeTablePageIndex
    };
    setStateWrap({
      pagination
    });
  }, [props]);
  return { state };
}
