import {
  OrganizationManageDTO,
  OrganizationTypeResponse,
  Datum,
  QueryStoreOrganizationReturn,
  VStoreSimple
} from '../dto/organization-manage.dto';
import { RequestService } from '~/framework/util/base-http/request.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * 真实开发中，请将示例代码移除
 */

const GET_ORGANIZATION_CHILD = 'prvilege/common/queryOrganizationChildByOrganizationId';
const QUERY_ORGANIZATION_TYPELIST_BY_SYSTEMID = 'prvilege/common/queryOrganizationTypeListBySystemId';
const QUERY_ORGANIZATION_BY_TYPEID = 'prvilege/common/queryOrganizationByTypeId';
const QUERY_STORE_ORGANIZATION_LIST_SUB = 'store/manage/queryStoreOrganizationListSub';
const QUERYSTORE_LIST_BY_ORGANIZATIONID = 'store/manage/queryStoreListByOrganizationId';
const QUERYSTORE_ORGANIZATION = 'store/manage/queryStoreOrganization';
const QUERY_GPS_ORGANIZATION = 'organization/manage/queryGpsOrganization';
const QUERY_GPS_ORGANIZATION_LIST_SUB = 'organization/manage/queryGpsOrganizationListSub';
export class OrganizationManageService extends OrganizationManageDTO {
  private readonly requestService: RequestService = new RequestService();
  constructor() {
    super();
  }

  // 获取当前头部组织的列表
  queryStoreOrganization(params: { typeId: string; id: string }): Observable<QueryStoreOrganizationReturn[]> {
    return this.requestService.get(QUERYSTORE_ORGANIZATION, params);
  }

  // 获取当前头部组织的列表
  queryGpsOrganization(params: {
    typeId: string;
    id: string;
    index: number;
    size: number;
  }): Observable<{ dataList: QueryStoreOrganizationReturn[]; total: number }> {
    return this.requestService.get(QUERY_GPS_ORGANIZATION, params);
  }

  // 根据父级id查询子级机构
  getOrganizationChild(params: { id: string; hierarchyType?: number }): Observable<Array<Datum>> {
    return this.requestService.get(GET_ORGANIZATION_CHILD, params);
  }

  // 根据Id查询仓库列表
  queryStoreListByOrganizationId(params: { organizationId: string }): Observable<VStoreSimple[]> {
    return this.requestService.get(QUERYSTORE_LIST_BY_ORGANIZATIONID, params);
  }

  // 获取子集组织
  queryStoreOrganizationListSub(params: { parentId: string }): Observable<QueryStoreOrganizationReturn[]> {
    return this.requestService.get(QUERY_STORE_ORGANIZATION_LIST_SUB, params);
  }

  // 获取GPS子集组织
  queryGpsOrganizationListSub(params: {
    currentOrganCode: string;
    parentId: string;
    index: number;
    size: number;
  }): Observable<{ dataList: QueryStoreOrganizationReturn[]; total: number }> {
    return this.requestService.get(QUERY_GPS_ORGANIZATION_LIST_SUB, params).pipe(
      map((data: { dataList: QueryStoreOrganizationReturn[]; total: number }) => {
        let dataList: QueryStoreOrganizationReturn[] = [];
        if (Array.isArray(data.dataList)) {
          dataList = data.dataList;
        }
        return { ...data, dataList };
      })
    );
  }

  // 根据系统id查找机构类型
  queryOrganizationTypeListBySystemId(systemId: string): Observable<OrganizationTypeResponse[]> {
    return this.requestService.get(QUERY_ORGANIZATION_TYPELIST_BY_SYSTEMID, { systemId });
  }

  // 根据机构类型Id查询机构顶端
  queryOrganizationByTypeId(params: { typeId: string }): Observable<Array<Datum>> {
    return this.requestService.get(QUERY_ORGANIZATION_BY_TYPEID, params);
  }
}
