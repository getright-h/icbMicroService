import { RealTimeTrackingReturn, VehicleInfoParamReture } from '~/solution/model/dto/position-monitor.dto';

/**
 * @export state变量定义和初始化
 * @class IIMapState
 */
export class IIMapState {
  locationList: any[] = [];
  currentChooseLocation: string = undefined;
}

// 当前的component是需要优化重写的，过重
export type TIMapProps = {
  locationCarMarkerList?: any[];
  currentSelectCar?: any;
  needRunDrivingLine?: boolean; // 车辆轨迹是否需要车辆回放还是只需要轨迹和停留点
  needRule?: boolean; // 是否需要测距
  isRunning?: boolean; // 轨迹回放车当前是停还是在跑
  needBaseController?: boolean; // 是否需要系统提供基础的空间
  id: string; // 当前地图的id
  controllerDirectiveModal?: (isClose: boolean, deviceCode: string) => void; // 根据不同的指令
  carSpeed?: number;
  permanentPlaceList?: any;
  needSearchAddress?: boolean;
  height?: string;
  openDrawRactangle?: boolean;
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
