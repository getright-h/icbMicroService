/**
 * @export state变量定义和初始化
 * @class IRollbackApplyState
 */
import { ALLOW_FLOW_ENUM } from '~shared/constant/common.const';

export class IRollbackApplyState {
  confirmLoading = false;
  opinion: number = null;
  rejectAuditRemark = '';
  status: number;
  deviceList: any[] = [];
}
/**
 * @export props变量定义和初始化
 * @class IRollbackApplyProps
 */
export class IRollbackApplyProps {
  visible: boolean;
  close: () => void;
  data: any = {};
  getTableData?: Function;
  allocationOperate?: Function;
  getAlloactionDetail?: Function;
}

export const STATE = [
  ALLOW_FLOW_ENUM.Reject, // 已驳回
  ALLOW_FLOW_ENUM.Inspection, // 待验货

  ALLOW_FLOW_ENUM.Returning, // 退货中
  ALLOW_FLOW_ENUM.Identification // 已收货
];
