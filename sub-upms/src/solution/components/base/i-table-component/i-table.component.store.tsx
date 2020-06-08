import { IITableState, IITableProps } from './i-table.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect } from 'react';

export function useITableStore(props: IITableProps) {
    const { state, setStateWrap } = useStateStore(new IITableState());
    useEffect(() => {
        const {pageIndex = 1, pageSize = 10, total = 0, changeTablePageIndex } = props
        let pagination = {
            current: pageIndex,
            showQuickJumper: true,
            showSizeChanger: false,
            showTotal: (total: number) => {
                return <div>{total}</div>
            },
            pageSize,
            total,
            onChange: changeTablePageIndex
        };
        setStateWrap({
            pagination
        })
    }, []);
    return { state }
}