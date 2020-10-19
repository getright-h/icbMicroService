
import {  StockDevicePagedListDto, DeviceSimpleInput, IDeviceDetail, IAddDeviceTypeDTO, IDeviceTypeDTO, DeviceTypePagedListDto, IReturn } from '../dto/device-type.dto';
import { RequestService } from '~/framework/util/base-http/request.service';
import { Observable } from 'rxjs';
import { DepUtil } from '~/framework/aop/inject';

/**
 * 真实开发中，请将示例代码移除
 */
// 设备管理分页列表
const QUERY_STOCK_DEVICE_PAGED_LIST = '/api/material/manage/queryStockDevicePagedList'
// 设备下拉框选择
const QUERY_DEVICE_SELECTED = '/api/material/manage/queryDeviceSelected'
// 设备管理设备详情
const QUERY_STOCK_DEVICE_DETAIL = '/api/material/manage/queryStockDeviceDetail'
// 新增设备型号
const INSET_DEVICE_TYPE = '/api/material/manage/insetDeviceType'
// 更新设备型号
const UPDATE_DEVICE_TYPE = '/api/material/manage/updateDeviceType'
// 删除设备类型
const DEVICE_TYPE = '/api/material/manage/deviceType'
// 查询设备类型分页列表
const QUERY_DEVICE_TYPE_PAGED_LIST = '/api/material/manage/queryDeviceTypePagedList'
// 设备类型详情
const DEVICE_TYPE_DETAIL = '/api/material/manage/deviceTypeDetail'


@DepUtil.Injectable()
export class DeviceTypeService  {
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
  updateDeviceType(params: ExampleRequestParam): Observable<IReturn> {
    return this.requestService.post(UPDATE_DEVICE_TYPE, params);
  }
  deviceType(params: ExampleRequestParam): Observable<IReturn> {
    return this.requestService.post(DEVICE_TYPE, params);
  }
  queryDeviceTypePagedList(params: ExampleRequestParam): Observable<IReturn> {
    return this.requestService.post(QUERY_DEVICE_TYPE_PAGED_LIST, params);
  }
  deviceTypeDetail(params: ExampleRequestParam): Observable<IReturn> {
    return this.requestService.post(DEVICE_TYPE_DETAIL, params);
  }
}