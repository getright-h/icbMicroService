/**
 * @export state变量定义和初始化
 * @class IVehicleManageState
 */
export class IVehicleManageState {
  isLoading = false;
  pageIndex = 1;
  pageSize = 10;
  tableData: any = [];
  total = 0;
  isUnbindDevice = false;
  currentId = '';
}
export enum ModalType {
  CREATE,
  EDIT,
  DETAIL,
  DELETE,
  UNBIND,
  IMPORT,
  EXPORT
}
