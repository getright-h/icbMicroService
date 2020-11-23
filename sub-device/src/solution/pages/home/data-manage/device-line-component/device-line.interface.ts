/**
 * @export state变量定义和初始化
 * @class IDeviceLineState
 */
import { DeviceTypeRoutePagedListDto } from '~model/dto/device-type.dto';
export class IDeviceLineState {
  searchForm: DeviceTypeRoutePagedListDto = {
    index: 1,
    size: 10,
    route: -1
  };
  isLoading = false;
  tableData: any[] = [];
  total = 0;
  visibleModal = false;
  routeModalVisible = false;
  currentData: any = {};
  flowList: any[] = [];
}
