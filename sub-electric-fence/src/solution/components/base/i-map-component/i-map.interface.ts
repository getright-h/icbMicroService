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
  needISelectCarLoadingComponent?: boolean;
  needDrawRactangle?: boolean;
  carLine?: any[];
};
