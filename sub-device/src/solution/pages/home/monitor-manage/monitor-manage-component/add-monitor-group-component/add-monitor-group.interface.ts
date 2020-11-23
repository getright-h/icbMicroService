/**
 * @export state变量定义和初始化
 * @class IAddMonitorGroupState
 */
export class IAddMonitorGroupState {
  submitLoading = false;
}

export interface AddMonitorGroupProp {
  close: Function;
  data: any;
  getDetail: Function;
  visible: boolean;
}
