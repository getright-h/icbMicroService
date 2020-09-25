import { OrganizationTreeDTO, OrganizationInfo, QueryStoreOrganizationParam } from '../dto/organization-tree.dto';
import { RequestService } from '~/framework/util/base-http/request.service';
import { Observable } from 'rxjs';
import { DepUtil } from '~/framework/aop/inject';

/**
 * 真实开发中，请将示例代码移除
 */

const QUERY_STORE_ORGANIZATION = 'store/manage/queryStoreOrganization';
const QUERY_STORE_ORGANIZATION_SUB = 'store/manage/queryStoreOrganizationListSub';

@DepUtil.Injectable()
export class OrganizationTreeService extends OrganizationTreeDTO {
  @DepUtil.Inject(RequestService)
  private readonly requestService: RequestService;
  constructor() {
    super();
  }

  // 查询机构列表
  queryStoreOrganization(params: QueryStoreOrganizationParam): Observable<Array<OrganizationInfo>> {
    return this.requestService.get(QUERY_STORE_ORGANIZATION, params);
  }
  // 查询下级机构列表
  queryStoreOrganizationListSub(parentId: string): Observable<Array<OrganizationInfo>> {
    return this.requestService.get(QUERY_STORE_ORGANIZATION_SUB, { parentId });
  }
}
