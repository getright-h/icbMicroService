/**
 * @export state变量定义和初始化
 * @class IPurchaseOrderState
 */
export class IPurchaseOrderState {
  isLoading = false;
  searchForm = {
    page: 1,
    size: 10
  };
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
  EXPORT,
  DELETE
}
