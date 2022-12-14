/**
 * @export state变量定义和初始化
 * @class IStatisticalListState
 */
export class IStatisticalListState {
  isLoading = false;
  pageIndex = 1;
  pageSize = 10;
  tableData: any = [];
  total = 0;
  currentId = '';
  timeInfo: string[] = [];
  exportVisible = false;
}
export enum ModalType {
  CREATE,
  EDIT,
  LOOK
}
