/**
 * @export state变量定义和初始化
 * @class IReceiveAllocationState
 */
export class IReceiveAllocationState {
  isLoading = false;
  searchForm = {
    index: 1,
    size: 10,
    state: -1
  };
  tableData: any = [];
  total = 0;
  visibleModal = false;
  currentId = '';
}
export enum ModalType {
  LOOK,
  RECIVE,
  REJECT,
  MOVE,
  PASS,
  RETURN
}
