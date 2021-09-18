import { SizeType } from 'antd/lib/config-provider/SizeContext';
import { ColumnsType, TablePaginationConfig } from 'antd/lib/table';
import { TableRowSelection, TableCurrentDataSource, SorterResult, Key } from 'antd/lib/table/interface';

/**
 * @export state变量定义和初始化
 * @class IITableState
 */
export class IITableState {
  pagination: false | TablePaginationConfig = {
    showSizeChanger: false
  };
}

export declare type SortOrder = 'descend' | 'ascend' | null;
export interface IITableProps {
  isLoading: boolean;
  scroll?: object;
  rowClick?: (record: any, event: any) => void;
  data: any;
  total: number;
  rowSelection?: {};
  showHeader?: boolean;
  size?: SizeType;
  pageSize?: number;
  columns?: ColumnsType<any>;
  expandable?: {};
  isPagination?: boolean;
  pageIndex?: number;
  onChange?: (
    pagination: TablePaginationConfig,
    filters: Record<string, (Key | boolean)[] | null>,
    sorter: SorterResult<any> | SorterResult<any>[],
    extra: TableCurrentDataSource<any>
  ) => void;
  changeTablePageIndex?: (page: number, pageSize?: number) => void;
  sortDirections?: Array<SortOrder>;
  showSizeChanger?: boolean | null;
  rowKey?: string;
}
