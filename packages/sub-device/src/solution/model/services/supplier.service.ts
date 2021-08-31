import { IReturn, VOrganizationByNameInput } from '../dto/supplier.dto';
import { RequestService } from '~/framework/util/base-http/request.service';
import { Observable } from 'rxjs';
import { DepUtil } from '~/framework/aop/inject';

// 供应商列表
const QUERY_SUPPLIER_LIST = 'store/manage/querySupplierList';

@DepUtil.Injectable()
export class SupplierService {
  @DepUtil.Inject(RequestService)
  private readonly requestService: RequestService;

  querySupplierList(params: VOrganizationByNameInput): Observable<IReturn> {
    return this.requestService.post(QUERY_SUPPLIER_LIST, params);
  }
}
