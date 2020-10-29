/**
 * @export state变量定义和初始化
 * @class IAddApprovalLineState
 */
export class IAddApprovalLineState {
  confirmLoading: boolean;
  currentMode = 1;
  userList: any[];
  roleList: any[];
}

export interface AddApprovalLineComponentProps {
  addAddApprovalLineVisible: boolean;
  setAddAddApprovalLineVisible: (status: boolean) => void;
  addUserInfo: (state: IAddApprovalLineState) => void;
}
