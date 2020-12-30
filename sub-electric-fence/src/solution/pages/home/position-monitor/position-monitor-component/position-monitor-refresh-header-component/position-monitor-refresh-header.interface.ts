/**
 * @export state变量定义和初始化
 * @class IPositionMonitorRefreshHeaderState
 */
export class IPositionMonitorRefreshHeaderState {
  refreshTime = 0;
}

export interface IPositionMonitorRefreshHeaderProps {
  refreshContentInfo: () => void;
  sentTime?: number;
  customStyle?: {};
}
