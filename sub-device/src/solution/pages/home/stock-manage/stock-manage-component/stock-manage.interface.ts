/**
 * @export state变量定义和初始化
 * @class IStockManageState
 */
export class IStockManageState {
  isLoading = false;
  searchForm = {
    page: 1,
    size: 10
  };
  tableData: any = [];
  total = 0;
  currentId = '';
  stockInVisible = false;
  bulkImportVisible = false;
  deviceEditVisible = false;
}
export enum ModalType {
  ADD,
  EDIT,
  DELETE,
  LOST,
  IMPORT,
  EXPORT
}
