/**
 * @export state变量定义和初始化
 * @class IPositionMonitorRightState
 */
export class IPositionMonitorRightState {
  mapbtnTrackrVisible = false;
  mapbtnDrivingVisible = false;
  deviceId = '';
  modalDirectiveVisible = false;
}

export class IPositionMonitorRightProps {
  stopRefresh: (stopTime: boolean) => void;
}
