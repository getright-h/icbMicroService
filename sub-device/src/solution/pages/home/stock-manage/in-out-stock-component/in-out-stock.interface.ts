/**
 * @export state变量定义和初始化
 * @class IInOutStockState
 */
export class IInOutStockState {
  isLoading = false;
  searchForm = {
    page: 1,
    size: 10
  };
  tableData: any = [];
  total = 0;
  recordVisible = false;
  deviceVisible = false;
  currentId = '';
  recordType = 0;
}
export enum ModalType {
  RECORD,
  DEVICE
}
