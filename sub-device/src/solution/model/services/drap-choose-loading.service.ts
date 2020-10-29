import {
  DrapChooseLoadingDTO,
  DrapChooseLoadingReturn,
  QueryDeviceTypeListParam,
  QueryOrganizationListParam,
  QueryPurchaseListParam,
  QueryStorePositionListParam,
  QuerySupplierListParam,
  QueryAllotFlowTemplatePagedListParam,
  QueryOwnerListParam,
  QueryDeviceListParam,
  QueryStoreListParam,
  QueryVehicleListParam,
  QueryVehiclePagedListParam
} from '../dto/drap-choose-loading.dto';
import { RequestService } from '~/framework/util/base-http/request.service';
import { Observable } from 'rxjs';
import { DepUtil } from '~/framework/aop/inject';
import { IReturn } from '../dto/template-service.dto';

const QUERYSTORE_LIST_BY_ORGANIZATIONID = 'store/manage/queryStoreListByOrganizationId';
const QUERY_ORGANIZATION_PAGED_LIST = 'store/manage/queryOrganizationPagedList';
const QUERY_DEVICE_TYPE_PAGED_LIST = 'material/manage/queryDeviceTypePagedList';
const QUERY_SUPPLIER_LIST = 'store/manage/querySupplierList';
const QUERY_STOREOR_GANIZATION = 'store/manage/queryOrganizationPagedList';
const QUERY_STORE_USER = 'store/manage/queryStoreUser';
const QUERY_PURCHASE_SELECT_LIST = 'allot/manage/queryPurchasePagedListSelected';
const QUERY_STORE_POSITION_LIST = 'store/manage/queryStorePositionPagedListByStoreIdSelected';
const QUERY_ALLOT_FLOW_TEMPLATE_PAGED_LIST = 'allot/manage/queryAllotFlowTemplatePagedList';
const QUERY_OWNER_LIST = 'vehicle/manage/queryOwnerPagedList';
const QUERY_DEVICE_LIST = 'material/manage/queryNormalStateDevicePagedList';
const QUERY_STORE_LIST = 'store/manage/queryStorePagedListSelected';
const QUERY_VEHICLE_LIST = 'vehicle/manage/queryVehiclePagedList';

const QUERY_VEHICLE_PAGED_LIST = 'vehicle/manage/queryVehiclePagedList';
const QUERY_ROLE_LIST = 'vehicle/manage/queryRoleList';

const QUERYSTOREPOSITIONPAGEDLISTBYSTOREID = 'store/manage/queryStorePositionPagedListByStoreId';
@DepUtil.Injectable()
export class DrapChooseLoadingService extends DrapChooseLoadingDTO {
  @DepUtil.Inject(RequestService)
  private readonly requestService: RequestService;
  constructor() {
    super();
  }

  // 经销商
  queryOrganizationList(params: QueryOrganizationListParam): Observable<DrapChooseLoadingReturn> {
    return this.requestService.post(QUERY_ORGANIZATION_PAGED_LIST, params);
  }
  // 设备类型
  queryDeviceTypeList(params: QueryDeviceTypeListParam): Observable<DrapChooseLoadingReturn> {
    return this.requestService.post(QUERY_DEVICE_TYPE_PAGED_LIST, params);
  }
  // 供应商
  querySupplierList(params: QuerySupplierListParam): Observable<DrapChooseLoadingReturn> {
    return this.requestService.post(QUERY_SUPPLIER_LIST, params);
  }

  // 获取仓位列表
  queryStorePositionPagedListByStoreId(params: QuerySupplierListParam): Observable<DrapChooseLoadingReturn> {
    return this.requestService.post(QUERYSTOREPOSITIONPAGEDLISTBYSTOREID, params);
  }
  // 采购单
  queryPurchaseSelectList(params: QueryPurchaseListParam): Observable<DrapChooseLoadingReturn> {
    return this.requestService.post(QUERY_PURCHASE_SELECT_LIST, params);
  }
  // 根据Id查询仓库列表
  queryStoreListByOrganizationId(params: { organizationId: string }): Observable<DrapChooseLoadingReturn> {
    return this.requestService.get(QUERYSTORE_LIST_BY_ORGANIZATIONID, params);
  }

  // 获取机构名称
  queryStoreOrganization(params: { systemId: string }): Observable<DrapChooseLoadingReturn> {
    return this.requestService.post(QUERY_STOREOR_GANIZATION, params);
  }
  //查询仓库人员列表
  queryStoreUser(params: { systemId: string }): Observable<DrapChooseLoadingReturn> {
    return this.requestService.post(QUERY_STORE_USER, params);
  }
  //仓位列表
  queryStorePositionList(params: QueryStorePositionListParam): Observable<DrapChooseLoadingReturn> {
    return this.requestService.post(QUERY_STORE_POSITION_LIST, params);
  }
  // 调拨模板列表
  queryAllotFlowTemplatePagedList(params: QueryAllotFlowTemplatePagedListParam): Observable<DrapChooseLoadingReturn> {
    return this.requestService.post(QUERY_ALLOT_FLOW_TEMPLATE_PAGED_LIST, params);
  }
  // 车主
  queryOwnerList(params: QueryOwnerListParam): Observable<DrapChooseLoadingReturn> {
    return this.requestService.post(QUERY_OWNER_LIST, params);
  }
  // 仓库(不需要机构id)
  queryStoreList(params: QueryStoreListParam): Observable<DrapChooseLoadingReturn> {
    return this.requestService.post(QUERY_STORE_LIST, params);
  }
  // 绑定设备选择
  queryDeviceList(params: QueryDeviceListParam): Observable<DrapChooseLoadingReturn> {
    return this.requestService.post(QUERY_DEVICE_LIST, params);
  }
  // 车架号查找车辆
  queryVehicleList(params: QueryVehicleListParam): Observable<DrapChooseLoadingReturn> {
    return this.requestService.post(QUERY_VEHICLE_LIST, params);
  }
  // 获取车辆列表
  queryVehiclePagedList(params: QueryVehiclePagedListParam): Observable<DrapChooseLoadingReturn> {
    return this.requestService.post(QUERY_VEHICLE_PAGED_LIST, params);
  }
  // 获取角色列表
  queryRoleList(params: QueryVehiclePagedListParam): Observable<DrapChooseLoadingReturn> {
    return this.requestService.post(QUERY_ROLE_LIST, params);
  }
}
