/**
 * @export state变量定义和初始化
 * @class IRejectAllocationState
 */

import { ALLOW_FLOW_ENUM } from '~shared/constant/common.const';

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

export const STATE = [
  // 待确认
  ALLOW_FLOW_ENUM.Reject, // 已驳回
  ALLOW_FLOW_ENUM.Inspection, // 待验货
  // 待验货
  ALLOW_FLOW_ENUM.Returning, // 退货中
  ALLOW_FLOW_ENUM.Identification // 已收货
];
