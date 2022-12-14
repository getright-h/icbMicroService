/**
 * @export state变量定义和初始化
 * @class IOrganizationManageState
 */

interface SearchForm {
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
    hierarchyType: 0,
    index: 1,
    size: 10
  };
  tableData: OrganizationTableData[] = [];
  total = 0;
  isLoading = false;
  popVisible = false;
  isEdit = false;
  isDetail = false;
  rowId: string;
}
