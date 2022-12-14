/**
 * @export state变量定义和初始化
 * @class IUserManageState
 */

interface SearchForm {
  name: string;
  telephone: string;
  organizationCode: string;
  departmentCode: string;
  positionCode: string;
  typeId: string;
  index: number;
  size: number;
}
export interface UserTableData {
  id: string;
  account: string;
  name: string;
  telephone: string;
  rolesCodeList: string[];
  state: boolean;
  systemId: string;
}
export class IUserManageState {
  searchForm: SearchForm = {
    name: '',
    telephone: '',
    organizationCode: '',
    departmentCode: '',
    positionCode: '',
    typeId: '',
    index: 1,
    size: 10
  };
  tableData: UserTableData[] = [];
  total = 0;
  isLoading = false;
  isEdit = false;
  isDetail = false;
  popVisible = false;
  userId: string;
  passwordVisible = false;
}
