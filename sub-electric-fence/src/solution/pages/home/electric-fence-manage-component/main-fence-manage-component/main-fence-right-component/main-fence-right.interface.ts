import { FENCETYPENUM } from '../create-electric-fence-component/create-electric-fence.interface';
import { FenceManageListReturnModal } from '~/solution/model/dto/fence-manage.dto';

/**
 * @export state变量定义和初始化
 * @class IMainFenceRightState
 */
export interface IMainFenceRightProps {
  // 圆心
  circleLocation?: Array<number>,
  // 半径
  circlrR?: number,
  polygonLocation?:  Array<number>,
  // 多边形path
  circlrPath?: any,
  mapInfo?: FenceManageListReturnModal;
  // 行政区域path
  administrativeDivisionPath?: any,
  // 当前显示圆形 多边形 还是行政区域
  currentChoose?: FENCETYPENUM,
  onValueChange: (key: string, value: any) => void
}
