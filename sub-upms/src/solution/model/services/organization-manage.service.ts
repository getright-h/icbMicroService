import { OrganizationManageDTO, OrganizationTypeResponse, Datum } from '../dto/organization-manage.dto';
import { RequestService } from '~/framework/util/base-http/request.service';
import { Observable } from 'rxjs';
import { DepUtil } from '~/framework/aop/inject';

/**
 * 真实开发中，请将示例代码移除
 */

const GET_ORGANIZATION_CHILD = 'prvilege/common/queryOrganizationChildByOrganizationId';
const QUERY_ORGANIZATION_TYPELIST_BY_SYSTEMID = 'prvilege/common/queryOrganizationTypeListBySystemId';
const QUERY_ORGANIZATION_BY_TYPEID = 'prvilege/common/queryOrganizationByTypeId';

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
}
