import {
  PositionMonitorDTO,
  QueryVehicleGroupListReturn,
  IQueryVehicleInfoPagedListParams
} from '../dto/position-monitor.dto';
import { RequestService } from '~/framework/util/base-http/request.service';
import { Observable } from 'rxjs';
import { DepUtil } from '~/framework/aop/inject';
import { VehicleInfoParamReture } from '~/solution/model/dto/position-monitor.dto';

/**
 * 真实开发中，请将示例代码移除
 */

const QUERY_VEHICLE_GROUP_LIST = 'vehicle/manage/queryVehicleGroupList';
const QUERY_VEHICLEINFO_PAGED_LIST = 'gps/monitoring/queryVehicleInfoPagedList';
const QUERY_VEHICLE_INFOBYPARAM = 'gps/monitoring/queryVehicleInfoByParam';
@DepUtil.Injectable()
export class PositionMonitorService extends PositionMonitorDTO {
  @DepUtil.Inject(RequestService)
  private readonly requestService: RequestService;
  constructor() {
    super();
  }

  queryVehicleGroupList(params: { organizationId: string }): Observable<QueryVehicleGroupListReturn[]> {
    return this.requestService.get(QUERY_VEHICLE_GROUP_LIST, params);
  }

  queryVehicleInfoPagedList(
    params: IQueryVehicleInfoPagedListParams
  ): Observable<{ dataList: VehicleInfoParamReture[]; total: number }> {
    return this.requestService.post(QUERY_VEHICLEINFO_PAGED_LIST, params);
  }

  queryVehicleInfoByParam(params: { vehicleIdList: Array<string> }): Observable<VehicleInfoParamReture[]> {
    return this.requestService.post(QUERY_VEHICLE_INFOBYPARAM, params);
  }
}
