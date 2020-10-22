import { ColumnsType, TablePaginationConfig } from 'antd/lib/table';

/**
 * @export state变量定义和初始化
 * @class IITableState
 */
export class IITableState {
  pagination: false | TablePaginationConfig;
}

export interface IITableProps {
  isLoading: boolean;
  data: any;
  total: number;
  pageSize?: number;
  columns: ColumnsType<any>;
  isPagination?: boolean;
  pageIndex: number;
  changeTablePageIndex: (page: number, pageSize?: number) => void;
  rowSelection?: any;
  rowKey?: string;
  summary?: any;
  title?: string;
}
