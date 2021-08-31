import { RealTimeTrackingReturn } from '~/solution/model/dto/position-monitor.dto';

/**
 * @export state变量定义和初始化
 * @class IPositionMonitorMapbtnTrackState
 */
export class IPositionMonitorMapbtnTrackState {
  refreshTime: string;
  carLine: RealTimeTrackingReturn;
}

export type IPositionMonitorMapbtnTrackProps = {
  mapbtnTrackrVisible: boolean;
  closeMapbtnPage: () => void;
};
