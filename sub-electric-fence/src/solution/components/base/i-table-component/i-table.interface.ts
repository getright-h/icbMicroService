import { ColumnsType, TablePaginationConfig } from 'antd/lib/table';

/**
 * @export state变量定义和初始化
 * @class IITableState
 */
export class IITableState {
  pagination: false | TablePaginationConfig = {
    showSizeChanger: false
  };
}

export interface IITableProps {
  isLoading: boolean;
  rowClick?: (record: any, event: any) => void;
  data: any;
  total: number;
  pageSize?: number;
  columns: ColumnsType<any>;
  isPagination?: boolean;
  pageIndex: number;
  changeTablePageIndex: (page: number, pageSize?: number) => void;
}
