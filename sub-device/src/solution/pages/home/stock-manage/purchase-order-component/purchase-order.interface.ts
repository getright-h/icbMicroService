/**
 * @export state变量定义和初始化
 * @class IPurchaseOrderState
 */
export class IPurchaseOrderState {
  isLoading = false;
  pageIndex = 1;
  pageSize = 10;
  timeInfo: string[] = [];
  tableData: any = [];
  sumAmount: number;
  sumNumber: number;
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
