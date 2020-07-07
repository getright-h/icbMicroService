/**
 * @export state变量定义和初始化
 * @class IOrganizationManageState
 */

interface SearchForm {
  systemId?: string;
  typeId?: string;
  parentId?: string;
  hierarchyType?: number;
  name?: string;
  index: number;
  size: number;
}
export interface OrganizationTableData {
  id: string;
  typeName: string;
  name: string;
  parentName: string;
  extendAttributionModel: {
    shorterName: string;
    contactName: string;
    contactMobile: string;
  };
}
export class IOrganizationManageState {
  searchForm: SearchForm = {
    systemId: process.env.SYSTEM_ID,
    hierarchyType: 0,
    index: 1,
    size: 10
  };
  tableData: OrganizationTableData[] = [];
  total = 0;
  isLoading = false;
}
