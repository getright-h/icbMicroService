import { DrapChooseLoadingDTO, DrapChooseLoadingParam, DrapChooseLoadingReturn } from '../dto/drap-choose-loading.dto';
import { RequestService } from '~/framework/util/base-http/request.service';
import { Observable } from 'rxjs';

/**
 * 真实开发中，请将示例代码移除
 */

const MANAGE_LIST = 'distributor/manage/list';
export class DrapChooseLoadingService extends DrapChooseLoadingDTO {
  private readonly requestService: RequestService = new RequestService();
  constructor() {
    super();
  }

  manageList(params: DrapChooseLoadingParam): Observable<{ dataList: DrapChooseLoadingReturn[]; total: number }> {
    return this.requestService.get(MANAGE_LIST, params);
  }
}
