import { VehicleInfoParamReture } from '~/solution/model/dto/position-monitor.dto';

/**
 * @export state变量定义和初始化
 * @class IIMapState
 */
export class IIMapState {
  locationList: any[] = [];
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
  carLine?: any[];
  drawDrivingLine?: (id: string) => void;
  onMapTrack?: (id: string) => void;
  drivingLineData?: any[];
  runCurrentPoint?: (index: number) => void;
  stopMarkers?: any[];
  setEndRunning?: () => void;
  // 当前车辆跑到哪里了
  currentPoint?: number;
};
