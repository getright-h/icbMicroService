import { RequestService } from '~/framework/util/base-http/request.service';
import { Observable } from 'rxjs';
import {
  DrapChooseLoadingDTO,
  DrapChooseLoadingParam,
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
  QueryVehiclePagedListParam,
  DrapChooseLoadingParams,
  QueryApprovalFormTemplateParams
} from '../dto/drap-choose-loading.dto';

/**
 * 真实开发中，请将示例代码移除
 */
const FENCE_MANAGE_LIST = 'fence/manage/list';
const FENCE_DDL_BELONG = 'fence/vehicle/ddl-vehicle-belong';
const MANAGE_LIST = 'distributor/manage/list';
const VEHICLE_INFO = 'fence/vehicle/ddl-vehicle-info';
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
const QUERY_GROUP_SEARCH_LIST = 'vehicle/manage/queryGroupSearchList';
const QUERYSTOREPOSITIONPAGEDLISTBYSTOREID = 'store/manage/queryStorePositionPagedListByStoreId';
const QUERY_USER_PAGED_LIST = 'approval/manage/queryUserPagedList';
const QUERY_APPROVAL_PAGED_LIST = 'approval/manage/queryApprovalGroupPagedList';
const QUERY_APPROVAL_FORM_TEMPLATE_PAGED_LIST = 'approval/manage/queryApprovalFormTemplatePagedList';
export class DrapChooseLoadingService extends DrapChooseLoadingDTO {
  private readonly requestService: RequestService = new RequestService();
  constructor() {
    super();
  }

  fenceList(params: { name: string; index: number; size: number }): Observable<any> {
    return this.requestService.post(FENCE_MANAGE_LIST, params);
  }

  manageList(params: DrapChooseLoadingParam): Observable<{ dataList: DrapChooseLoadingReturn[]; total: number }> {
    return this.requestService.get(MANAGE_LIST, params);
  }

  fenceDdlBelong(params: { key: string }) {
    return this.requestService.get(FENCE_DDL_BELONG, params);
  }

  fenceDdlVehicleInfo(params: { key: string }) {
    return this.requestService.get(VEHICLE_INFO, params);
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

  //查询人员列表
  queryUserPagedList(params: QueryPurchaseListParam): Observable<DrapChooseLoadingReturn> {
    return this.requestService.post(QUERY_USER_PAGED_LIST, params);
  }

  // 查询角色列表
  queryRoleList(params: QueryPurchaseListParam): Observable<DrapChooseLoadingReturn> {
    return this.requestService.get(QUERY_ROLE_LIST, params);
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

  // 监控组
  queryApprovalPagedList(params: DrapChooseLoadingParams): Observable<DrapChooseLoadingReturn> {
    return this.requestService.post(QUERY_APPROVAL_PAGED_LIST, params);
  }
  // 监控组ID查询模板列表
  queryApprovalFormTemplatePagedList(params: QueryApprovalFormTemplateParams): Observable<DrapChooseLoadingReturn> {
    return this.requestService.post(QUERY_APPROVAL_FORM_TEMPLATE_PAGED_LIST, params);
  }
  //监控组搜索
  queryGroupSearchList(params: QueryVehiclePagedListParam): Observable<DrapChooseLoadingReturn> {
    return this.requestService.get(QUERY_GROUP_SEARCH_LIST, params);
  }
}
