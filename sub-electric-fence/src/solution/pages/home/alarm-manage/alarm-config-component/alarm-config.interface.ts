/**
 * @export state变量定义和初始化
 * @class IAlarmConfigState
 */
export class IAlarmConfigState {
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
