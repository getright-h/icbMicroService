/**
 * @export state变量定义和初始化
 * @class IApprovalApplyState
 */
export class IApprovalApplyState {
  curGroupId: string;
  curTemplateId: string;
  curGroupName: string;
}

export class IApprovalApplyProps {
  visible: boolean;
  handlePropsOk: (state: IApprovalApplyState) => void;
  changeVisible: (status: boolean) => void;
}
