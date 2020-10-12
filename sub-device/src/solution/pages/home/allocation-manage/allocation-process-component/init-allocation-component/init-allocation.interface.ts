/**
 * @export state变量定义和初始化
 * @class IInitAllocationState
 */
export class IInitAllocationState {
  isLoading = false;
  searchForm = {
    index: 1,
    size: 10,
    state: -1
  };
  tableData: any = [];
  total = 0;
  importVisible = false;
  rollbackVisible = false;
  currentId = '';
}
export enum ModalType {
  CREATE,
  DETAIL,
  CONFIRM,
  REAPPLY,
  WITHDRAW,
  ROLLBACK,
  RETURN
}
