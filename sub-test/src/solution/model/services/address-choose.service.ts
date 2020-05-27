import { AddressChooseDTO, AreasListReturn, AreasListParam } from '../dto/address-choose.dto';
import { RequestService } from '~/framework/util/base-http/request.service';
import { Observable } from 'rxjs';
import { DepUtil } from '~/framework/aop/inject';

/**
 * 真实开发中，请将示例代码移除
 */

const AREAS_LIST = 'owner/app/areasList';
const AREALIST_BY_CODE = 'owner/app/areaListByCode';

@DepUtil.Injectable()
export class AddressChooseService extends AddressChooseDTO {
  @DepUtil.Inject(RequestService)
  private readonly requestService: RequestService;
  constructor() {
    super();
  }

  areasList(params: AreasListParam): Observable<AreasListReturn[]> {
    return this.requestService.get(AREAS_LIST, params);
  }

  areaListByCode(params: AreasListParam): Observable<AreasListReturn[]> {
    return this.requestService.get(AREALIST_BY_CODE, params);
  }
}
