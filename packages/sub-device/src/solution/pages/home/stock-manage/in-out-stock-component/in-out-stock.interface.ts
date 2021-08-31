/**
 * @export state变量定义和初始化
 * @class IInOutStockState
 */
export class IInOutStockState {
  isLoading = false;
  pageIndex = 1;
  pageSize = 10;
  timeInfo: string[] = [];
  tableData: any = [];
  total = 0;
  recordVisible = false;
  deviceVisible = false;
  currentId = '';
  recordType = 0;
  statistics = {
    inNumber: 0,
    outNumber: 0,
    totalNumber: 0
  };
}
export enum ModalType {
  RECORD,
  DEVICE
}
