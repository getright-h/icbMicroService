/**
 * @export state变量定义和初始化
 * @class IPositionMonitorRefreshHeaderState
 */
export class IPositionMonitorRefreshHeaderState {
  refreshTime = 20;
}

export interface IPositionMonitorRefreshHeaderProps {
  refreshContentInfo: () => void;
}
