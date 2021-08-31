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

export enum ApprovalStatus {
  Revoke = 0, // 已撤回
  Auditing = 100, // 待审批,
  Audited = 200, //审批中
  Success = 300, //审批通过
  Refused = 400
}
