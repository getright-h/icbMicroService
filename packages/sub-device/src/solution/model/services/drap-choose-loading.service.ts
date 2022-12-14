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
  QueryVehiclePagedListParam,
  DrapChooseLoadingParams,
  QueryApprovalFormTemplateParams,
  IDirectiveReturn
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
const QUERY_OWNER_LIST = 'vehicle/manage/dropDownOwnerPagedList';
const QUERY_DEVICE_LIST = 'material/manage/queryNormalStateDevicePagedList';
const QUERY_STORE_LIST = 'store/manage/queryStorePagedListSelected';
const QUERY_VEHICLE_LIST = 'vehicle/manage/queryVehiclePagedList';

const QUERY_VEHICLE_BY_DISTRIBUTOR_LIST = 'vehicle/manage/queryVehicleByDistributorList';
const QUERY_ROLE_LIST = 'vehicle/manage/queryRoleList';
const QUERY_GROUP_SEARCH_LIST = 'vehicle/manage/queryGroupSearchList';
const QUERYSTOREPOSITIONPAGEDLISTBYSTOREID = 'store/manage/queryStorePositionPagedListByStoreId';
const QUERY_USER_PAGED_LIST = 'approval/manage/queryUserPagedList';
const QUERY_APPROVAL_PAGED_LIST = 'approval/manage/queryApprovalGroupPagedList';
const QUERY_APPROVAL_FORM_TEMPLATE_PAGED_LIST = 'approval/manage/queryApprovalFormTemplatePagedList';
const CMD_TYPES = 'gps/cmd/types';
const QUERY_VEHICLE_SELECTED_PAGED_LIST = 'vehicle/manage/queryVehicleSelectedPagedList';

@DepUtil.Injectable()
export class DrapChooseLoadingService extends DrapChooseLoadingDTO {
  @DepUtil.Inject(RequestService)
  private readonly requestService: RequestService;
  constructor() {
    super();
  }

  // ?????????
  queryOrganizationList(params: QueryOrganizationListParam): Observable<DrapChooseLoadingReturn> {
    return this.requestService.post(QUERY_ORGANIZATION_PAGED_LIST, params);
  }
  // ????????????
  queryDeviceTypeList(params: QueryDeviceTypeListParam): Observable<DrapChooseLoadingReturn> {
    return this.requestService.post(QUERY_DEVICE_TYPE_PAGED_LIST, params);
  }
  // ?????????
  querySupplierList(params: QuerySupplierListParam): Observable<DrapChooseLoadingReturn> {
    return this.requestService.post(QUERY_SUPPLIER_LIST, params);
  }

  // ??????????????????
  queryStorePositionPagedListByStoreId(params: QuerySupplierListParam): Observable<DrapChooseLoadingReturn> {
    return this.requestService.post(QUERYSTOREPOSITIONPAGEDLISTBYSTOREID, params);
  }
  // ?????????
  queryPurchaseSelectList(params: QueryPurchaseListParam): Observable<DrapChooseLoadingReturn> {
    return this.requestService.post(QUERY_PURCHASE_SELECT_LIST, params);
  }
  // ??????Id??????????????????
  queryStoreListByOrganizationId(params: { organizationId: string }): Observable<DrapChooseLoadingReturn> {
    return this.requestService.get(QUERYSTORE_LIST_BY_ORGANIZATIONID, params);
  }

  //??????????????????
  queryUserPagedList(params: QueryPurchaseListParam): Observable<DrapChooseLoadingReturn> {
    return this.requestService.post(QUERY_USER_PAGED_LIST, params);
  }

  // ??????????????????
  queryRoleList(params: QueryPurchaseListParam): Observable<DrapChooseLoadingReturn> {
    return this.requestService.post(QUERY_ROLE_LIST, params);
  }

  // ??????????????????
  queryStoreOrganization(params: { systemId: string }): Observable<DrapChooseLoadingReturn> {
    return this.requestService.post(QUERY_STOREOR_GANIZATION, params);
  }
  //????????????????????????
  queryStoreUser(params: { systemId: string }): Observable<DrapChooseLoadingReturn> {
    return this.requestService.post(QUERY_STORE_USER, params);
  }
  //????????????
  queryStorePositionList(params: QueryStorePositionListParam): Observable<DrapChooseLoadingReturn> {
    return this.requestService.post(QUERY_STORE_POSITION_LIST, params);
  }
  // ??????????????????
  queryAllotFlowTemplatePagedList(params: QueryAllotFlowTemplatePagedListParam): Observable<DrapChooseLoadingReturn> {
    return this.requestService.post(QUERY_ALLOT_FLOW_TEMPLATE_PAGED_LIST, params);
  }
  // ??????
  queryOwnerList(params: QueryOwnerListParam): Observable<DrapChooseLoadingReturn> {
    return this.requestService.post(QUERY_OWNER_LIST, params);
  }
  // ??????(???????????????id)
  queryStoreList(params: QueryStoreListParam): Observable<DrapChooseLoadingReturn> {
    return this.requestService.post(QUERY_STORE_LIST, params);
  }
  // ??????????????????
  queryDeviceList(params: QueryDeviceListParam): Observable<DrapChooseLoadingReturn> {
    return this.requestService.post(QUERY_DEVICE_LIST, params);
  }
  // ?????????????????????
  queryVehicleList(params: QueryVehicleListParam): Observable<DrapChooseLoadingReturn> {
    return this.requestService.post(QUERY_VEHICLE_LIST, params);
  }
  // ????????????????????????????????????
  queryVehicleByDistributorList(params: { distributorIdList: string[] }): Observable<DrapChooseLoadingReturn> {
    return this.requestService.post(QUERY_VEHICLE_BY_DISTRIBUTOR_LIST, params);
  }

  // ?????????
  queryApprovalPagedList(params: DrapChooseLoadingParams): Observable<DrapChooseLoadingReturn> {
    return this.requestService.post(QUERY_APPROVAL_PAGED_LIST, params);
  }
  // ?????????ID??????????????????
  queryApprovalFormTemplatePagedList(params: QueryApprovalFormTemplateParams): Observable<DrapChooseLoadingReturn> {
    return this.requestService.post(QUERY_APPROVAL_FORM_TEMPLATE_PAGED_LIST, params);
  }
  //???????????????
  queryGroupSearchList(params: QueryVehiclePagedListParam): Observable<DrapChooseLoadingReturn> {
    return this.requestService.post(QUERY_GROUP_SEARCH_LIST, params);
  }
  // ??????????????????
  getTypesList(): Observable<{ data: IDirectiveReturn[]; total: number }> {
    return this.requestService.post(CMD_TYPES);
  }
  //???????????????????????????
  queryVehicleSelectedPagedList(params: QueryVehiclePagedListParam): Observable<DrapChooseLoadingReturn> {
    return this.requestService.post(QUERY_VEHICLE_SELECTED_PAGED_LIST, params);
  }
}
