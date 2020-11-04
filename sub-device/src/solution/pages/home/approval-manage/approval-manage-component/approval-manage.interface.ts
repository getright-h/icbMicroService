/**
 * @export state变量定义和初始化
 * @class IApprovalManageState
 */
export class IApprovalManageState {
  isLoading = false;
  searchForm = { index: 1, size: 10 };
  tableData: any[] = [];
  total = 0;
  currentTab = '1';
}
