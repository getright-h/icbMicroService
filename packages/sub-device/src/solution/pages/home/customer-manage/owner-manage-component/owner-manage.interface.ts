/**
 * @export state变量定义和初始化
 * @class IOwnerManageState
 */
export class IOwnerManageState {
  isLoading = false;
  pageIndex = 1;
  pageSize = 10;
  tableData: any = [];
  total = 0;
  editVisible = false;
  detailVisible = false;
  currentId = '';
}
export enum ModalType {
  CREATE,
  EDIT,
  DETAIL,
  DELETE,
  IMPORT,
  EXPORT
}
