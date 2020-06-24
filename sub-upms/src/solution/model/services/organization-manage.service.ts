import {
  OrganizationManageDTO,
  QueryOrganizationListParams,
  InsertOrganizationParams,
  SetOrganizationParams,
  OrganizationTypeResponse,
  Datum,
  AreaInfoReturn
} from '../dto/organization-manage.dto';
import { RequestService } from '~/framework/util/base-http/request.service';
import { Observable } from 'rxjs';
import { DepUtil } from '~/framework/aop/inject';

/**
 * 真实开发中，请将示例代码移除
 */

// 机构管理
const GET_ORGANIZATION_CHILD = 'prvilege/common/queryOrganizationChildByOrganizationId';
const QUERY_ORGANIZATION_TYPELIST_BY_SYSTEMID = 'prvilege/common/queryOrganizationTypeListBySystemId';
const QUERY_ORGANIZATION_BY_TYPEID = 'prvilege/common/queryOrganizationByTypeId';
const QUERY_ORGANIZATION_LIST = 'prvilege/common/queryOrganizationByParam';
const INSERT_ORGANIZATION = 'prvilege/common/insertOrganization';
const SET_ORGANIZATION = 'prvilege/common/setOrganization';
const DELETE_ORGANIZATION = 'prvilege/common/organization';
const GET_ORGANIZATION_DETAIL = 'prvilege/common/organizationDetail';
const GET_PROVINCE_LIST = 'prvilege/areasList';
const GET_AREA_LIST_BY_CODE = 'prvilege/areaListByCode';

@DepUtil.Injectable()
export class OrganizationManageService extends OrganizationManageDTO {
  @DepUtil.Inject(RequestService)
  private readonly requestService: RequestService;
  constructor() {
    super();
  }

  // 根据父级id查询子级机构
  getOrganizationChild(params: { id: string; hierarchyType?: number }): Observable<Array<Datum>> {
    return this.requestService.get(GET_ORGANIZATION_CHILD, params);
  }

  // 根据系统id查找机构类型
  queryOrganizationTypeListBySystemId(systemId: string): Observable<OrganizationTypeResponse[]> {
    return this.requestService.get(QUERY_ORGANIZATION_TYPELIST_BY_SYSTEMID, { systemId });
  }

  // 根据机构类型Id查询机构顶端
  queryOrganizationByTypeId(params: { typeId: string }): Observable<Array<Datum>> {
    return this.requestService.get(QUERY_ORGANIZATION_BY_TYPEID, params);
  }

  // 根据条件查询机构信息
  queryOrganizationList(params: QueryOrganizationListParams): Observable<Array<Datum>> {
    return this.requestService.post(QUERY_ORGANIZATION_LIST, params);
  }

  // 添加机构
  insertOrganization(params: InsertOrganizationParams): Observable<Datum> {
    return this.requestService.post(INSERT_ORGANIZATION, params);
  }

  // 修改机构
  setOrganization(params: SetOrganizationParams): Observable<boolean> {
    return this.requestService.post(SET_ORGANIZATION, params);
  }

  // 删除机构
  deleteOrganization(organizationId: string): Observable<boolean> {
    return this.requestService.delete(DELETE_ORGANIZATION, { organizationId });
  }

  // 查询机构详情
  getOrganizationDetail(strValue: string): Observable<Datum> {
    return this.requestService.get(GET_ORGANIZATION_DETAIL, { strValue });
  }

  // 查询省
  getProvinceList(deep: number): Observable<Array<AreaInfoReturn>> {
    return this.requestService.get(GET_PROVINCE_LIST, { deep });
  }

  // 查询市、区
  getAreaListByCode(cityCode: string): Observable<Array<AreaInfoReturn>> {
    return this.requestService.get(GET_AREA_LIST_BY_CODE, { cityCode });
  }
}
