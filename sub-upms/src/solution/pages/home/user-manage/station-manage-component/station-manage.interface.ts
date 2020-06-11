/**
 * @export state变量定义和初始化
 * @class IStationManageState
 */
interface SearchForm {
  index: number;
  size: number;
}
interface TableData {}
export class IStationManageState {
  searchForm: SearchForm = {
    index: 1,
    size: 10
  };
  tableData: TableData[] = [];
  total = 0;
  isLoading = false;
}
