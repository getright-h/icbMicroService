import {
  StockDevicePagedListDto,
  DeviceSimpleInput,
  IDeviceDetail,
  IAddDeviceTypeDTO,
  IDeviceTypeDTO,
  DeviceTypePagedListDto,
  IReturn
} from '../dto/device-type.dto';
import { RequestService } from '~/framework/util/base-http/request.service';
import { Observable } from 'rxjs';
import { DepUtil } from '~/framework/aop/inject';

/**
 * 真实开发中，请将示例代码移除
 */
// 设备管理分页列表
const QUERY_STOCK_DEVICE_PAGED_LIST = 'material/manage/queryStockDevicePagedList';
// 设备下拉框选择
const QUERY_DEVICE_SELECTED = 'material/manage/queryDeviceSelected';
// 设备管理设备详情
const QUERY_STOCK_DEVICE_DETAIL = 'material/manage/queryStockDeviceDetail';
// 新增设备型号
const INSET_DEVICE_TYPE = 'material/manage/insetDeviceType';
// 更新设备型号
const UPDATE_DEVICE_TYPE = 'material/manage/updateDeviceType';
// 删除设备类型
const DEVICE_TYPE = 'material/manage/deviceType';
// 查询设备类型分页列表
const QUERY_DEVICE_TYPE_PAGED_LIST = 'material/manage/queryDeviceTypePagedList';
// 设备类型详情
const DEVICE_TYPE_DETAIL = 'material/manage/deviceTypeDetail';
//设备路径分页列表
const QUERY_DEVICE_PAGED_LIST = 'material/manage/queryDevicePagedList';
//设备路线流程节点详情
const QUERY_DEVICE_FLOW_RECORD_INFO_LIST = 'material/manage/queryDeviceFlowRecordInfoList';
// 查询已绑定车主的信息
const QUERY_VEHICLE_INFORMATION_BY_CODE = 'vehicle/manage/queryVehicleInformationByCode';
// 报警指令类型
const CMD_TYPES = 'gps/cmd/types';
@DepUtil.Injectable()
export class DeviceTypeService {
  @DepUtil.Inject(RequestService)
  private readonly requestService: RequestService;

  queryStockDevicePagedList(params: StockDevicePagedListDto): Observable<IReturn> {
    return this.requestService.post(QUERY_STOCK_DEVICE_PAGED_LIST, params);
  }
  queryDeviceSelected(params: DeviceSimpleInput): Observable<IReturn> {
    return this.requestService.post(QUERY_DEVICE_SELECTED, params);
  }
  queryStockDeviceDetail(params: IDeviceDetail): Observable<IReturn> {
    return this.requestService.post(QUERY_STOCK_DEVICE_DETAIL, params);
  }
  insetDeviceType(params: IAddDeviceTypeDTO): Observable<IReturn> {
    return this.requestService.post(INSET_DEVICE_TYPE, params);
  }
  updateDeviceType(params: IDeviceTypeDTO): Observable<IReturn> {
    return this.requestService.post(UPDATE_DEVICE_TYPE, params);
  }
  deviceType(params: IDeviceTypeDTO): Observable<IReturn> {
    return this.requestService.delete(DEVICE_TYPE, params);
  }
  queryDeviceTypePagedList(params: DeviceTypePagedListDto): Observable<IReturn> {
    return this.requestService.post(QUERY_DEVICE_TYPE_PAGED_LIST, params);
  }
  queryDevicePagedList(params: any): Observable<IReturn> {
    return this.requestService.post(QUERY_DEVICE_PAGED_LIST, params);
  }
  deviceTypeDetail(params: IDeviceTypeDTO): Observable<IReturn> {
    return this.requestService.get(DEVICE_TYPE_DETAIL, params);
  }
  queryDeviceFlowRecordInfoList(params: IDeviceTypeDTO): Observable<IReturn> {
    return this.requestService.get(QUERY_DEVICE_FLOW_RECORD_INFO_LIST, params);
  }
  queryVehicleInformationByCode(params: { deviceCode: string }): Observable<IReturn> {
    return this.requestService.get(QUERY_VEHICLE_INFORMATION_BY_CODE, params);
  }
  getTypesList(): Observable<IReturn> {
    return this.requestService.post(CMD_TYPES);
  }
}
