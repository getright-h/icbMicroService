import {
  DrapChooseLoadingDTO,
  OrganizationSelectListParams,
  DrapChooseLoadingReturn
} from '../dto/drap-choose-loading.dto';
import { RequestService } from '~/framework/util/base-http/request.service';
import { Observable } from 'rxjs';
import { DepUtil } from '~/framework/aop/inject';

/**
 * 真实开发中，请将示例代码移除
 */

const QUERY_ORGANIZATION_TYPE = 'prvilege/common/queryOrganizationTypeListBySystemId';
const QUERY_ORGANIZATION_LIST = 'prvilege/common/queryOrganizationSelectPagedList';

@DepUtil.Injectable()
export class DrapChooseLoadingService extends DrapChooseLoadingDTO {
  @DepUtil.Inject(RequestService)
  private readonly requestService: RequestService;
  constructor() {
    super();
  }

  queryOrganizationType(params: { systemId: string }): Observable<DrapChooseLoadingReturn> {
    return this.requestService.get(QUERY_ORGANIZATION_TYPE, params);
  }
  queryOrganizationSelectList(params: OrganizationSelectListParams): Observable<DrapChooseLoadingReturn> {
    return this.requestService.post(QUERY_ORGANIZATION_LIST, params);
  }
}
