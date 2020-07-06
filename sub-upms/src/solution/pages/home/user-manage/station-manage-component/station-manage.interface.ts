/**
 * @export state变量定义和初始化
 * @class IStationManageState
 */
interface SearchForm {
  systemId: string;
  parentOrganizationCode?: string;
  code?: string;
  name?: string;
  state: number;
  type: number;
  index: number;
  size: number;
}
export interface StationTableData {
  id: string;
  parentOrganizationName: string;
  parentDepartmentName: string;
  name: string;
  instruction: string;
  roleList: string[];
  state: boolean;
}
export class IStationManageState {
  searchForm: SearchForm = {
    systemId: process.env.SYSTEM_ID,
    state: -1,
    type: 2,
    index: 1,
    size: 10
  };
  tableData: StationTableData[] = [];
  total = 0;
  isLoading = false;
  editStationInfo: Record<string, any>;
  isEdit: boolean;
  editStationVisible: boolean;
}
