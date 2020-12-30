import { QueryVehicleListParam } from '~/solution/model/dto/drap-choose-loading.dto';
import {
  IQueryVehicleInfoPagedListParams,
  QueryVehicleGroupListReturn,
  VehicleInfoParamReture
} from '~/solution/model/dto/position-monitor.dto';
/**
 * @export state变量定义和初始化
 * @class IPositionMonitorDrawerLeftState
 */
export class IPositionMonitorDrawerLeftState {
  isLoading = false;
  searchForm: IQueryVehicleInfoPagedListParams = {
    index: 1,
    size: 10,
    organizationId: '',
    vehicleGroupId: undefined,
    strValue: ''
  };
  vehicleGroupList: QueryVehicleGroupListReturn[] = [];
  selectedRowKeys: any[] = [];
  tableData: VehicleInfoParamReture[] = [];
  total = 0;
}
