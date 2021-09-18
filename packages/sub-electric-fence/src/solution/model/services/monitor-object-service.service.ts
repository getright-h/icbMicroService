import {
  MonitorObjectServiceDTO,
  VehicleBindParams,
  EditBatchParams,
  MonitorObjectListParams,
  MonitorObjectListreturn,
  DllThingReturn
} from '../dto/monitor-object-service.dto';
import { RequestService } from '~/framework/util/base-http/request.service';
import { Observable } from 'rxjs';
import { DepUtil } from '~/framework/aop/inject';

/**
 * 真实开发中，请将示例代码移除
 */

const FENCE_VEHICLE_LIST = 'fence/vehicle/list';
const VEHICLE_BIND = 'fence/vehicle/bind';
const VEHICLE_UNBIND = 'fence/vehicle/unbind';
const VEHICLE_EDIT = 'fence/vehicle/edit';
const VEHICLE_EDIT_BATCH = 'fence/vehicle/edit-batch';
const VEHICLE_VEHICLE_DDL = 'fence/vehicle/ddl-thing';

@DepUtil.Injectable()
export class MonitorObjectServiceService implements MonitorObjectServiceDTO {
  @DepUtil.Inject(RequestService)
  private readonly requestService: RequestService;

  vehicleList(params: MonitorObjectListParams): Observable<{ data: MonitorObjectListreturn[]; total: number }> {
    return this.requestService.post(FENCE_VEHICLE_LIST, params);
  }

  vehicleBind(params: VehicleBindParams) {
    return this.requestService.post(VEHICLE_BIND, params);
  }

  vehicleUnbind(params: { id: string }): Observable<boolean> {
    return this.requestService.get(VEHICLE_UNBIND, params);
  }

  vehicleEdit(params: { id: string }): Observable<boolean> {
    return this.requestService.post(VEHICLE_EDIT, params);
  }

  vehicleEditBatch(params: EditBatchParams): Observable<boolean> {
    return this.requestService.post(VEHICLE_EDIT_BATCH, params);
  }

  vehicleDdlThing(params: { key: string }): Observable<{ data: Array<DllThingReturn> }> {
    return this.requestService.get(VEHICLE_VEHICLE_DDL, params);
  }
}
