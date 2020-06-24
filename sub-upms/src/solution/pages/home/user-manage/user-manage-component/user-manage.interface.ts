/**
 * @export state变量定义和初始化
 * @class IUserManageState
 */
interface SearchForm {
  systemId: string;
  name: string;
  telephone: string;
  index: number;
  size: number;
}
interface TableData { }
export class IUserManageState {
  searchForm: SearchForm = {
    systemId: process.env.SYSTEM_ID,
    name: '',
    telephone: '',
    index: 1,
    size: 10
  };
  tableData: TableData[] = [];
  total = 0;
  isLoading = false;
}
