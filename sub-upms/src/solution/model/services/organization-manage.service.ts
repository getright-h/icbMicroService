import {
  OrganizationManageDTO,
  QueryOrganizationListParams,
  ExampleResponseResult,
  InsertOrganizationParams,
  SetOrganizationParams
} from '../dto/organization-manage.dto';
import { RequestService } from '~/framework/util/base-http/request.service';
import { Observable } from 'rxjs';
import { DepUtil } from '~/framework/aop/inject';

/**
 * 真实开发中，请将示例代码移除
 */

// 机构管理
const GET_ORGANIZATION_CHILD = 'prvilege/common/queryOrganizationChildByOrganizationId';
const QUERY_ORGANIZATION_LIST = 'prvilege/common/queryOrganizationByParam';
const INSERT_ORGANIZATION = 'prvilege/common/queryOrganizationByParam';
const SET_ORGANIZATION = 'prvilege/common/queryOrganizationByParam';

@DepUtil.Injectable()
export class OrganizationManageService extends OrganizationManageDTO {
  @DepUtil.Inject(RequestService)
  private readonly requestService: RequestService;
  constructor() {
    super();
  }

  getOrganizationChild(code: string): Observable<ExampleResponseResult> {
    return this.requestService.get(GET_ORGANIZATION_CHILD, { code });
  }
  queryOrganizationList(params: QueryOrganizationListParams): Observable<ExampleResponseResult> {
    return this.requestService.post(QUERY_ORGANIZATION_LIST, params);
  }
  insertOrganization(params: InsertOrganizationParams): Observable<ExampleResponseResult> {
    return this.requestService.post(INSERT_ORGANIZATION, params);
  }
  setOrganization(params: SetOrganizationParams): Observable<ExampleResponseResult> {
    return this.requestService.post(SET_ORGANIZATION, params);
  }
}
