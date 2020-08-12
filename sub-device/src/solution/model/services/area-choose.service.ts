import { AreaChooseDTO, AreaReturnDto } from '../dto/area-choose.dto';
import { RequestService } from '~/framework/util/base-http/request.service';
import { Observable } from 'rxjs';
import { DepUtil } from '~/framework/aop/inject';

/**
 * 真实开发中，请将示例代码移除
 */

const QUERY_AREA_INFO_HTTP = 'Organization/manage/QueryAreaInfoHttp';

@DepUtil.Injectable()
export class AreaChooseService extends AreaChooseDTO {
  @DepUtil.Inject(RequestService)
  private readonly requestService: RequestService;
  constructor() {
    super();
  }

  queryAreaInfoHttp(params: { code?: string }): Observable<AreaReturnDto[]> {
    return this.requestService.get(QUERY_AREA_INFO_HTTP, params);
  }
}
