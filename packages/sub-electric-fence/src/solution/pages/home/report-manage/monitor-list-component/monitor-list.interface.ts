/**
 * @export state变量定义和初始化
 * @class IMonitorListState
 */
export class IMonitorListState {
  isLoading = false;
  pageIndex = 1;
  pageSize = 10;
  tableData: any = [];
  total = 0;
  currentId = '';
  exportVisible = false;
  canExport = false;
}
export enum ModalType {
  CREATE,
  EDIT
}
