/**
 * @export state变量定义和初始化
 * @class IUserManageState
 */
interface SearchForm {
  index: number;
  size: number;
}
interface TableData {}
export class IUserManageState {
  searchForm: SearchForm = {
    index: 1,
    size: 10
  };
  tableData: TableData[] = [];
  total = 0;
  isLoading = false;
}
