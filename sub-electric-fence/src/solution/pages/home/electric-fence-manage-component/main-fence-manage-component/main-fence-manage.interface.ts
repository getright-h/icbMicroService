import { FENCETYPENUM } from './create-electric-fence-component/create-electric-fence.interface';
import { PAGESIZE } from '~/solution/shared/constant/common.const';
import { FenceManageListReturnModal } from '~/solution/model/dto/fence-manage.dto';

/**
 * @export state变量定义和初始化
 * @class IMainFenceManageState
 */
export class IMainFenceManageState {
  searchLoading = false;
  visible = false;
  circleLocation: any;
  circlrR? = 200;
  isEdit = false;
  mapInfo: FenceManageListReturnModal;
  polygon: any[];
  polygonLocation? = { lat: 0, lng: 0 };
  circlrPath?: any = [];
  administrativeDivisionPath?: any = [];
  currentChoose?: number = FENCETYPENUM.POLYGON;
  searchForm = {
    index: 1,
    size: PAGESIZE,
    name: ''
  };
  singleFenceData: FenceManageListReturnModal;
}
