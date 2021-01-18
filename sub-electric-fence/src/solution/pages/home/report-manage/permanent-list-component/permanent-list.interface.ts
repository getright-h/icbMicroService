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
  timeInfo: string[] = [];
  currentId = '';
}
export enum ModalType {
  CREATE,
  EDIT
}
