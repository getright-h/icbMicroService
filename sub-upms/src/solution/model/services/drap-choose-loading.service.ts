import { DrapChooseLoadingDTO, DrapChooseLoadingParam, DrapChooseLoadingReturn } from '../dto/drap-choose-loading.dto';
import { RequestService } from '~/framework/util/base-http/request.service';
import { Observable } from 'rxjs';
import { DepUtil } from '~/framework/aop/inject';

/**
 * 真实开发中，请将示例代码移除
 */

const MANAGE_LIST = 'distributor/manage/list';

@DepUtil.Injectable()
export class DrapChooseLoadingService extends DrapChooseLoadingDTO {
  @DepUtil.Inject(RequestService)
  private readonly requestService: RequestService;
  constructor() {
    super();
  }

  manageList(params: DrapChooseLoadingParam): Observable<{ dataList: DrapChooseLoadingReturn[]; total: number }> {
    return this.requestService.get(MANAGE_LIST, params);
  }
}
