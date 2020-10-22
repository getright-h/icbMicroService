/**
 * @export state变量定义和初始化
 * @class IMonitorManageState
 */
export class IMonitorManageState {
  addGroupModalVisible = false;
  addCarModalVisible = false;
  currentData: any = {};
  searchForm: any = {};
  tableData: any[] = [];
  total = 0;
  isLoading = false;
}
