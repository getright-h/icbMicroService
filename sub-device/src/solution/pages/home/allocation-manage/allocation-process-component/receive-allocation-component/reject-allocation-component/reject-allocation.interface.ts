/**
 * @export state变量定义和初始化
 * @class IRejectAllocationState
 */
export class IRejectAllocationState {
  searchForm = {};
  submitLoading = false;
  currentCondition: any = {};
}

export interface IRejectAllocationProp {
  getTableData?: () => void;
  getAlloactionDetail?: (id: string) => void;
  data: any;
  allocationOperate: Function;
  close: () => void;
  visible: boolean;
  currentActionType: any;
}

export enum ModalType {
  LOOK,
  RECIVE,
  REJECT,
  MOVE,
  PASS,
  RETURN
}
