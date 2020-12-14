import { RealTimeTrackingReturn, VehicleInfoParamReture } from '~/solution/model/dto/position-monitor.dto';

/**
 * @export state变量定义和初始化
 * @class IIMapState
 */
export class IIMapState {
  locationList: any[] = [];
  currentChooseLocation: string = undefined;
}

export type TIMapProps = {
  locationCarMarkerList?: any[];
  currentSelectCar?: any;
  isRunning?: boolean;
  id: string;
  carSpeed?: number;
  needSearchAddress?: boolean;
  height?: string;
  needDrawRactangle?: boolean;
  carLine?: RealTimeTrackingReturn;
  drawDrivingLine?: (currentDoActionCarInfo: VehicleInfoParamReture) => void;
  onMapTrack?: (currentDoActionCarInfo: VehicleInfoParamReture) => void;
  drivingLineData?: RealTimeTrackingReturn;
  runCurrentPoint?: (index: number) => void;
  stopMarkers?: any[];
  setEndRunning?: () => void;
  // 当前车辆跑到哪里了
  currentPoint?: number;
};
