import { FENCETYPENUM } from './create-electric-fence-component/create-electric-fence.interface';

/**
 * @export state变量定义和初始化
 * @class IMainFenceManageState
 */
export class IMainFenceManageState {
  searchLoading = false;
  visible = false;
  circleLocation: any;
  circlrR? = 200;
  polygonLocation? = { lat: 0, lng: 0 };
  circlrPath?: any = [];
  administrativeDivisionPath?: any = [];
  currentChoose?: number = FENCETYPENUM.CIRCLE;
}
