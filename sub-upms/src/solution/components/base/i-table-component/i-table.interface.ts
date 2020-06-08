import { ColumnsType, TablePaginationConfig } from 'antd/lib/table';
import { Key, SorterResult } from 'antd/es/table/interface';
import { TableCurrentDataSource } from 'antd/lib/table/interface';

/**
 * @export state变量定义和初始化
 * @class IITableState
 */
export class IITableState {
    pagination: false | TablePaginationConfig;
}

export interface IITableProps {
    isLoding: boolean;
    data: any;
    total: number;
    pageSize?: number;
    columns: ColumnsType<any>;
    isPagination?: boolean;
    pageIndex: number;
    changeTablePageIndex:  (page: number, pageSize?: number) => void;
}