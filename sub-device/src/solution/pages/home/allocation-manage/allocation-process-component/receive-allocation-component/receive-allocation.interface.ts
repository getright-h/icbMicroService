/**
 * @export state变量定义和初始化
 * @class IReceiveAllocationState
 */
export class IReceiveAllocationState {
  isLoading = false;
  searchForm = {
    page: 1,
    size: 10
  };
  tableData: any = [];
  total = 0;
  visibleModal = false;
  currentId = '';
}
export enum ModalType {
  CREATE,
  EDIT,
  DELETE
}
