/**
 * @export state变量定义和初始化
 * @class IApprovalTableState
 */
export class IApprovalTableState {
  isLoading = false;
  searchForm = {
    index: 1,
    size: 10
  };
  tableData: any = [];
  total = 0;
  visibleModal = false;
  currentId = '';
}
export enum ModalType {
  CREATE,
  EDIT,
  DELETE
}
