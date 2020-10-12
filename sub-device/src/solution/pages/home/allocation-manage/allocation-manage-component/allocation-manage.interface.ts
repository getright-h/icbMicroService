/**
 * @export state变量定义和初始化
 * @class IAllocationManageState
 */
export class IAllocationManageState {
  isLoading = false;
  searchForm: ISearchFrom = {
    index: 1,
    size: 10,
    state: -1
  };
  tableData: any = [];
  total = 0;
  visibleModal = false;
  currentId = '';
}

interface ISearchFrom {
  state?: number; //调拨操作 = ['0', '1', '-1']
  code?: string; //调拨单号 ,
  index: number;
  size: number;
  beginTime?: number;
  endTime?: number;
}
export enum ModalType {
  CREATE,
  ALLOCATE,
  DETAIL,
  RECORD,
  EDIT,
  DELETE
}
