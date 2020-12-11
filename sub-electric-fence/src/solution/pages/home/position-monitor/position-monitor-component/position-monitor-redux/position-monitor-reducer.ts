import { EventDataNode } from 'antd/lib/tree';
import { DeviceList, VehicleInfoParamReture } from '~/solution/model/dto/position-monitor.dto';
import { IAction } from '~/solution/shared/interfaces/common.interface';
import { TYPES } from './position-monitor-types';

export const positionMonitorInitialState: TPositionMonitor = {
  currentSelectNode: undefined,
  rightDrawervisible: false,
  leftContentVisible: false,
  leftDrawerVisible: false,
  checkedCarData: [],
  currentSelectCar: undefined,
  selectedRowKeys: [],
  mapbtnTrackrVisible: false,
  // 当前去看轨迹或者追踪用的车辆
  currentDoActionCarInfo: undefined
};

export type TPositionMonitor = {
  currentSelectNode: EventDataNode;
  rightDrawervisible: boolean;
  leftContentVisible: boolean;
  leftDrawerVisible: boolean;
  checkedCarData: VehicleInfoParamReture[];
  currentSelectCar: VehicleInfoParamReture;
  currentDoActionCarInfo: { deviceInfo: DeviceList; markerInfo: VehicleInfoParamReture };
  selectedRowKeys: any;
  mapbtnTrackrVisible: boolean;
};

export function PositionMonitorReducer(state = positionMonitorInitialState, action: IAction<any>) {
  const { type, payload } = action;
  switch (type) {
    case TYPES.SET_TREE_SELECT_NODE:
      return {
        ...state,
        currentSelectNode: payload
      };
    case TYPES.SET_DATA:
      return {
        ...state,
        ...payload
      };
    default:
      return state;
  }
}
