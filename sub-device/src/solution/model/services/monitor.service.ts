import { InsertMonitorVehicleparams } from '../dto/monitor.dto';
import { RequestService } from '~/framework/util/base-http/request.service';
import { Observable } from 'rxjs';
import { DepUtil } from '~/framework/aop/inject';

/**
 * 真实开发中，请将示例代码移除
 */

// 新增监控组
const INSERT_VEHICLE_GROUP = 'vehicle/manage/insertVehicleGroup';
// 更新监控组
const SET_VEHICLE_GROUP = 'vehicle/manage/setVehicleGroup';
// 删除监控组
const VEHICLE_GROUP = 'vehicle/manage/vehicleGroup';
// 添加监控车辆
const INSERT_MONITOR_VEHICLE = 'vehicle/manage/insertMonitorVehicle';
// 转组
const TRANSFER_GROUP = 'vehicle/manage/transferGroup';
// 根据机构Id查询监控组
const QUERY_VEHICLE_GROUPLIST = 'vehicle/manage/queryVehicleGroupList';
// 监控组详情
const QUERY_VEHICLE_GROUP_DETAIL = 'vehicle/manage/queryVehicleGroupDetail';
// 监控车辆设备列表
const QUERY_VEHICLE_GROUP_PAGED_LIST = 'vehicle/manage/queryVehicleGroupPagedList';
// 计算车辆数据
const CALCULATION_MONITOR_VEHICLE_NUMBER = 'vehicle/manage/calculationMonitorVehicleNumber';
// 监控组搜索
const QUERY_GROUP_SEARCH_LIST = 'vehicle/manage/queryGroupSearchList';
@DepUtil.Injectable()
export class MonitorService {
  @DepUtil.Inject(RequestService)
  private readonly requestService: RequestService;

  insertVehicleGroup(params: InsertMonitorVehicleparams): Observable<any> {
    return this.requestService.post(INSERT_VEHICLE_GROUP, params);
  }
  setVehicleGroup(params: any): Observable<any> {
    return this.requestService.post(SET_VEHICLE_GROUP, params);
  }
  vehicleGroup(params: { id: string }): Observable<any> {
    return this.requestService.get(VEHICLE_GROUP, params);
  }
  insertMonitorVehicle(params: any): Observable<any> {
    return this.requestService.post(INSERT_MONITOR_VEHICLE, params);
  }
  transferGroup(params: any): Observable<any> {
    return this.requestService.post(TRANSFER_GROUP, params);
  }
  queryVehicleGroupList(params: any): Observable<any> {
    return this.requestService.post(QUERY_VEHICLE_GROUPLIST, params);
  }
  queryVehicleGroupDetail(params: any): Observable<any> {
    return this.requestService.post(QUERY_VEHICLE_GROUP_DETAIL, params);
  }
  queryVehicleGroupPagedList(params: any): Observable<any> {
    return this.requestService.post(QUERY_VEHICLE_GROUP_PAGED_LIST, params);
  }
  calculationMonitorVehicleNumber(params: any): Observable<any> {
    return this.requestService.post(CALCULATION_MONITOR_VEHICLE_NUMBER, params);
  }
  queryGroupSearchList(params: any): Observable<any> {
    return this.requestService.get(QUERY_GROUP_SEARCH_LIST, params);
  }
}
