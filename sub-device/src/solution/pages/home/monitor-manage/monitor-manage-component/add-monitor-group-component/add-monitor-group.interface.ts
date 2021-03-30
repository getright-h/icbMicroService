/**
 * @export state变量定义和初始化
 * @class IAddMonitorGroupState
 */
export class IAddMonitorGroupState {
  submitLoading = false;
  organization: IOrg = {};
  searchRoleName = '';
}

export interface AddMonitorGroupProp {
  close: Function;
  data: any;
  getDetail?: Function;
  visible: boolean;
  alertCurrentTreeData?: Function;
  appendNewNodeToCurrentTreeData?: Function;
}

export interface IOrg {
  organizationCode?: string;
  organizationId?: string;
  organizationName?: string;
}
