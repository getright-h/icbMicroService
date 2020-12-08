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
  id: string;
  needSearchAddress?: boolean;
  height?: string;
  needDrawRactangle?: boolean;
  carLine?: any[];
  drawDrivingLine?: (id: string) => void;
  onMapTrack?: (id: string) => void;
  drivingLineData?: any[];
  stopMarkers?: any[];
};
