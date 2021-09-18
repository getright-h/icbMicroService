/**
 * @export state变量定义和初始化
 * @class IStateListState
 */
export class IStateListState {
  isLoading = false;
  pageIndex = 1;
  pageSize = 10;
  tableData: any = [];
  total = 0;
  currentId = '';
  exportVisible = false;
}
export enum ModalType {
  CREATE,
  EDIT
}
