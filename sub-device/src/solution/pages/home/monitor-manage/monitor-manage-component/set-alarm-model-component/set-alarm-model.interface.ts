/**
 * @export state变量定义和初始化
 * @class IAddMonitorGroupState
 */
export class IAddMonitorGroupState {
  submitLoading = false;
}

export interface ISetAlarmProp {
  close: Function;
  data: any;
  visible: boolean;
}
