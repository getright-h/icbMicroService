/**
 * @export state变量定义和初始化
 * @class IDepartmentManageState
 */
interface SearchForm {
  code: string;
  name: string;
  state: number;
  index: number;
  size: number;
}
interface DepartmentTableData {
  id: string;
  parentOrganizationName: string;
  parentDepartmentName: string;
  name: string;
  instruction: string;
  state: boolean;
}
export class IDepartmentManageState {
  searchForm: SearchForm = {
    code: '',
    name: '',
    state: -1,
    index: 1,
    size: 10
  };
  tableData: DepartmentTableData[] = [];
  total = 0;
  isLoading = false;
  editDepartmentInfo: Record<string, any>;
  editDepartmentVisible = false;
  isEdit = false;
}
