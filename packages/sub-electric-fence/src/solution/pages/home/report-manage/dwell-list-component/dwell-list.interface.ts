/**
 * @export state变量定义和初始化
 * @class IDwellListState
 */
export class IDwellListState {
  isLoading = false;
  pageIndex = 1;
  pageSize = 10;
  tableData: any = [];
  total = 0;
  currentId = '';
}
export enum ModalType {
  CREATE,
  EDIT
}
