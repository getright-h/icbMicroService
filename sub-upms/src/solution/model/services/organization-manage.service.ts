
import { OrganizationManageDTO, ExampleRequestParam, ExampleResponseResult } from '../dto/organization-manage.dto';
import { RequestService } from '~/framework/util/base-http/request.service';
import { Observable } from 'rxjs';
import { DepUtil } from '~/framework/aop/inject';

/**
 * 真实开发中，请将示例代码移除
 */

const EXAMPLE_API_PATH: string = 'your-http-request-path';

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
}