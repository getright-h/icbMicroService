/**
 * @export state变量定义和初始化
 * @class IAddMonitorGroupState
 */
export class IAddMonitorGroupState {
  submitLoading = false;
  organization: {
    organizationCode?: string;
    organizationId?: string;
    organizationName?: string;
  } = {};
}

export interface AddMonitorGroupProp {
  close: Function;
  data: any;
  getDetail?: Function;
  visible: boolean;
  alertCurrentTreeData?: Function;
}
