import {
  CustomerManageDTO,
  DeviceUnbindRequestParam,
  OwnerDetailResponseResult,
  OwnerListRequestParam,
  OwnerListResponseResult,
  SetOwnerRequestParam,
  SetVehicleRequestParam,
  VehicleDetailResponse,
  VehicleLayout,
  VehicleListRequestParam,
  VehicleListResponseResult
} from '../dto/customer-manage.dto';
import { RequestService } from '~/framework/util/base-http/request.service';
import { Observable } from 'rxjs';
import { DepUtil } from '~/framework/aop/inject';

/**
 * 真实开发中，请将示例代码移除
 */

const QUERY_OWNER_PAGED_LIST = 'vehicle/manage/queryOwnerPagedList';
const GET_OWNER_DETAIL = 'vehicle/manage/ownerDetail';
const INSERT_OWNER = 'vehicle/manage/insertOwner';
const UPDATE_OWNER = 'vehicle/manage/updateOwner';
const DELETE_OWNER = 'vehicle/manage/owner';

const QUERY_VEHICLE_PAGED_LIST = 'vehicle/manage/queryVehiclePagedList';
const GET_VEHICLE_DETAIL = 'vehicle/manage/vehicleDetail';
const INSERT_VEHICLE = 'vehicle/manage/insertVehicle';
const UPDATE_VEHICLE = 'vehicle/manage/updateVehicle';
const DELETE_VEHICLE = 'vehicle/manage/vehicle';
const UNBINDING_DEVICE_TO_STORE = 'vehicle/manage/unBindingPutStore';
const UNBINDING_DEVICE = 'vehicle/manage/unBinding';

const VEHICLE_BRAND = 'vehicle/manage/vehicleBrand';
const VEHICLE_FACTORY = 'vehicle/manage/vehicleFactory';
const VEHICLE_VERSION = 'vehicle/manage/vehicleVersion';
const VEHICLE_CONFIG = 'vehicle/manage/vehicleConfig';

@DepUtil.Injectable()
export class CustomerManageService extends CustomerManageDTO {
  @DepUtil.Inject(RequestService)
  private readonly requestService: RequestService;
  constructor() {
    super();
  }

  // 车主管理列表
  queryOwnerPagedList(params: OwnerListRequestParam): Observable<OwnerListResponseResult> {
    return this.requestService.post(QUERY_OWNER_PAGED_LIST, params);
  }
  // 车主详情
  getOwnerDetail(id: string): Observable<OwnerDetailResponseResult> {
    return this.requestService.get(GET_OWNER_DETAIL, { id });
  }
  // 新增车主
  insertOwner(params: SetOwnerRequestParam): Observable<boolean> {
    return this.requestService.post(INSERT_OWNER, params);
  }
  // 更新车主
  updateOwner(params: SetOwnerRequestParam): Observable<boolean> {
    return this.requestService.post(UPDATE_OWNER, params);
  }
  // 删除车主
  deleteOwner(id: string): Observable<boolean> {
    return this.requestService.delete(DELETE_OWNER, { id });
  }

  // 车辆管理列表
  queryVehiclePagedList(params: VehicleListRequestParam): Observable<VehicleListResponseResult> {
    return this.requestService.post(QUERY_VEHICLE_PAGED_LIST, params);
  }
  // 车辆详情
  getVehicleDetail(id: string): Observable<VehicleDetailResponse> {
    return this.requestService.get(GET_VEHICLE_DETAIL, { id });
  }
  // 新增车辆
  insertVehicle(params: SetVehicleRequestParam): Observable<boolean> {
    return this.requestService.post(INSERT_VEHICLE, params);
  }
  // 更新车辆
  updateVehicle(params: SetVehicleRequestParam): Observable<boolean> {
    return this.requestService.post(UPDATE_VEHICLE, params);
  }
  // 删除车辆
  deleteVehicle(id: string): Observable<boolean> {
    return this.requestService.delete(DELETE_VEHICLE, { id });
  }
  // 解绑入库
  deviceUnbindToStore(params: DeviceUnbindRequestParam): Observable<boolean> {
    return this.requestService.get(UNBINDING_DEVICE_TO_STORE, params);
  }
  // 直接解绑
  deviceUnbind(params: DeviceUnbindRequestParam): Observable<boolean> {
    return this.requestService.get(UNBINDING_DEVICE, params);
  }
  // 车辆品牌
  getVehicleBrand(params: { name?: string }): Observable<Array<VehicleLayout>> {
    return this.requestService.get(VEHICLE_BRAND, params);
  }
  // 车辆型号
  getVehicleFactory(params: { name?: string; code?: string }): Observable<Array<VehicleLayout>> {
    return this.requestService.get(VEHICLE_FACTORY, params);
  }
  // 车辆系列
  getVehicleVersion(params: { name?: string; code?: string }): Observable<Array<VehicleLayout>> {
    return this.requestService.get(VEHICLE_VERSION, params);
  }
  // 车辆配置
  getVehicleConfig(params: { name?: string; id?: string }): Observable<Array<VehicleLayout>> {
    return this.requestService.get(VEHICLE_CONFIG, params);
  }
}
