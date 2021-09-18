/**
 * @export state变量定义和初始化
 * @class IAlarmParameterState
 */
export class IDirectiveListState {
  isLoading = false;
  pageIndex = 1;
  pageSize = 10;
  tableData: any = [];
  total = 0;
  currentId = '';
  currentRoleId = '';
  sloveModalVisible = false;
  recordModalVisible = false;
  timeInfo: string[] = [];
  exportVisible = false;
  canExport = false;
}
export enum ModalType {
  RECORD,
  SLOVE
}
