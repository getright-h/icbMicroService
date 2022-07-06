import { FENCE_TYPE_ENUM } from '../area-search-car.interface';

/**
 * @export state变量定义和初始化
 * @class IFenceMapState
 */
export class IFenceMapState {}

export interface IFenceMapProps {
  // 圆心
  circleLocation?: Array<number>;
  // 区域类型
  fenceType?: FENCE_TYPE_ENUM;
  // 行政区域code
  districtAdcode?: string;
  onValueChange: (key: string, value: any) => void;
  pointDatas?: any[];
}
