
import { MonitorDTO, ExampleRequestParam, ExampleResponseResult } from '../dto/monitor.dto';
import { RequestService } from '~/framework/util/base-http/request.service';
import { Observable } from 'rxjs';
import { DepUtil } from '~/framework/aop/inject';

/**
 * 真实开发中，请将示例代码移除
 */


// 新增监控组
const INSERT_VEHICLE_GROUP = '/api/vehicle/manage/insertVehicleGroup'
// 更新监控组
const SET_VEHICLE_GROUP = '/api/vehicle/manage/setVehicleGroup'
// 删除监控组
const VEHICLE_GROUP = '/api/vehicle/manage/vehicleGroup'
// 添加监控车辆
const INSERT_MONITOR_VEHICLE = '/api/vehicle/manage/insertMonitorVehicle'
// 转组
const TRANSFER_GROUP = '/api/vehicle/manage/transferGroup'
// 根据机构Id查询监控组
const QUERY_VEHICLE_GROUPLIST = '/api/vehicle/manage/queryVehicleGroupList'
// 监控组详情
const QUERY_VEHICLE_GROUP_DETAIL = '/api/vehicle/manage/queryVehicleGroupDetail'
// 监控车辆设备列表
const QUERY_VEHICLE_GROUP_PAGED_LIST = '/api/vehicle/manage/queryVehicleGroupPagedList'
@DepUtil.Injectable()
export class MonitorService  {
  @DepUtil.Inject(RequestService)
  private readonly requestService: RequestService;

  insertVehicleGroup(params: ExampleRequestParam): Observable<ExampleResponseResult> {
    return this.requestService.post(INSERT_VEHICLE_GROUP, params);
  }
  setVehicleGroup(params: ExampleRequestParam): Observable<ExampleResponseResult> {
    return this.requestService.post(SET_VEHICLE_GROUP, params);
  }
  vehicleGroup(params: ExampleRequestParam): Observable<ExampleResponseResult> {
    return this.requestService.post(VEHICLE_GROUP, params);
  }
  insertMonitorVehicle(params: ExampleRequestParam): Observable<ExampleResponseResult> {
    return this.requestService.post(INSERT_MONITOR_VEHICLE, params);
  }
  transferGroup(params: ExampleRequestParam): Observable<ExampleResponseResult> {
    return this.requestService.post(TRANSFER_GROUP, params);
  }
  queryVehicleGroupList(params: ExampleRequestParam): Observable<ExampleResponseResult> {
    return this.requestService.post(QUERY_VEHICLE_GROUPLIST, params);
  }
  queryVehicleGroupDetail(params: ExampleRequestParam): Observable<ExampleResponseResult> {
    return this.requestService.post(QUERY_VEHICLE_GROUP_DETAIL, params);
  }
  queryVehicleGroupPagedList(params: ExampleRequestParam): Observable<ExampleResponseResult> {
    return this.requestService.post(QUERY_VEHICLE_GROUP_PAGED_LIST, params);
  }
}