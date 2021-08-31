/**
 * @export state变量定义和初始化
 * @class IApprovalDealWithState
 */
export class IApprovalDealWithState {
  isLoading = false;
  pageIndex = 1;
  pageSize = 10;
  tableData: any = [];
  total = 0;
  visibleModal = false;
  currentId = '';
  curGroupId = '';
}
export enum ModalType {
  CREATE,
  EDIT,
  WITHDRAW,
  DETAIL
}
