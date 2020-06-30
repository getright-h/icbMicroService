import { FENCETYPENUM } from '../create-electric-fence-component/create-electric-fence.interface';

/**
 * @export state变量定义和初始化
 * @class IMainFenceRightState
 */
export interface IMainFenceRightProps {
  circleLocation?: Array<number>,
  circlrR?: number,
  polygonLocation?:  Array<number>,
  circlrPath?: any,
  administrativeDivisionPath?: any,
  currentChoose?: number,
  onValueChange: (key: string, value: any) => void
}
