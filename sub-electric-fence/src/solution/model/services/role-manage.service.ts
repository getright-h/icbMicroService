
import { RoleManageDTO, ExampleRequestParam, ExampleResponseResult } from '../dto/role-manage.dto';
import { RequestService } from '~/framework/util/base-http/request.service';
import { Observable } from 'rxjs';

/**
 * 真实开发中，请将示例代码移除
 */

const EXAMPLE_API_PATH: string = 'your-http-request-path';

export class RoleManageService extends RoleManageDTO {
  private readonly requestService: RequestService = new RequestService();
  constructor() {
    super();
  }

  example(params: ExampleRequestParam): Observable<ExampleResponseResult> {
    return this.requestService.get(EXAMPLE_API_PATH, params);
  }
}