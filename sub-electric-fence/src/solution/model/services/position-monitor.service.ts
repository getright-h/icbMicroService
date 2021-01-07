import {
  PositionMonitorDTO,
  QueryVehicleGroupListReturn,
  IQueryVehicleInfoPagedListParams,
  QueryMonitorAlarmInfoPagedListParams,
  QueryVehicleTrajectoryArrayListReturn,
  QueryMonitorAlarmInfoPagedListReturn
} from '../dto/position-monitor.dto';
import { RequestService } from '~/framework/util/base-http/request.service';
import { Observable } from 'rxjs';
import { DepUtil } from '~/framework/aop/inject';
import { VehicleInfoParamReture, RealTimeTrackingReturn } from '~/solution/model/dto/position-monitor.dto';
import { map } from 'rxjs/operators';
import { IMAP } from '~/solution/shared/util/map.util';

/**
 * 真实开发中，请将示例代码移除
 */
const QUERY_VEHICLE_HISTORY_TRAJECTORY = 'gps/monitoring/queryVehicleHistoryTrajectory';
const QUERY_VEHICLE_GROUP_LIST = 'vehicle/manage/queryVehicleGroupList';
const QUERY_VEHICLEINFO_PAGED_LIST = 'gps/monitoring/queryVehicleInfoPagedList';
const QUERY_VEHICLE_INFOBYPARAM = 'gps/monitoring/queryVehicleInfoByParam';
const REAL_TIME_TRACKING = 'gps/monitoring/realTimeTracking';
const QUERY_VEHICLE_TRAJECTORY_ARRAYLIST = 'gps/monitoring/queryVehicleTrajectoryArrayList';
const QUERY_MONITOR_ALARMINFOPAGED_LIST = 'alarmCenter/manage/queryMonitorAlarmInfoPagedList';
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
    function dealWithCoordinates(data: VehicleInfoParamReture[]) {
      data = data.map(item => {
        item.deviceList = item.deviceList.map(device => {
          device.coordinates = IMAP.initLonlat(device.coordinates[0], device.coordinates[1]);
          return device;
        });
        item.permanentPlaceList = item.permanentPlaceList.map(permanentPlace => {
          permanentPlace.coordinates = IMAP.initLonlat(permanentPlace.coordinates[0], permanentPlace.coordinates[1]);
          return permanentPlace;
        });
        return item;
      });
      return data;
    }
    return this.requestService.post(QUERY_VEHICLE_INFOBYPARAM, params).pipe(
      map(data => {
        return dealWithCoordinates(data);
      })
    );
  }

  realTimeTracking(params: { code: string }): Observable<RealTimeTrackingReturn> {
    return this.requestService.get(REAL_TIME_TRACKING, params);
  }

  queryMonitorAlarmInfoPagedList(
    params: QueryMonitorAlarmInfoPagedListParams
  ): Observable<{
    monitorAlarmList: { dataList: QueryMonitorAlarmInfoPagedListReturn[]; total: number };
    count: number;
  }> {
    return this.requestService.post(QUERY_MONITOR_ALARMINFOPAGED_LIST, params);
  }

  queryVehicleHistoryTrajectory(params: {
    deviceCode: string;
    beginTime: string;
    endTime: string;
  }): Observable<RealTimeTrackingReturn> {
    return this.requestService.post(QUERY_VEHICLE_HISTORY_TRAJECTORY, params);
  }

  queryVehicleTrajectoryArrayList(params: {
    deviceCode: string;
    beginTime: string;
    endTime: string;
  }): Observable<Array<QueryVehicleTrajectoryArrayListReturn>> {
    return this.requestService.post(QUERY_VEHICLE_TRAJECTORY_ARRAYLIST, params);
  }
}
