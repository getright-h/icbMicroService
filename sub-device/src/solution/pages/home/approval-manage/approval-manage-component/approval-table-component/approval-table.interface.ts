/**
 * @export state变量定义和初始化
 * @class IApprovalTableState
 */
export class IApprovalTableState {
  isLoading = false;
  pageIndex = 1;
  chooseModalVisible = false;
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
