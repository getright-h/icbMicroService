import {
  WarehouseListDTO,
  QueryOrganizationPagedReturn,
  QueryOrganizationPagedParams,
  QueryStorePositionParams,
  QueryStorePositionReturn,
  QueryStoreOrganizationReturn
} from '../dto/warehouse-list.dto';
import { RequestService } from '~/framework/util/base-http/request.service';
import { Observable } from 'rxjs';
import { DepUtil } from '~/framework/aop/inject';

/**
 * 真实开发中，请将示例代码移除
 */

const QUERYORGANIZATIONPAGEDLIST = 'store/manage/queryOrganizationPagedList';
const QUERYSTOREPOSITIONPAGEDLISTBYSTOREID = 'store/manage/queryStorePositionPagedListByStoreId';
const QUERYSTORE_ORGANIZATION = 'store/manage/queryStoreOrganization';
const QUERY_STORE_ORGANIZATION_LIST_SUB = 'store/manage/queryStoreOrganizationListSub';
@DepUtil.Injectable()
export class WarehouseListService extends WarehouseListDTO {
  @DepUtil.Inject(RequestService)
  private readonly requestService: RequestService;
  constructor() {
    super();
  }

  queryOrganizationPagedList(params: QueryOrganizationPagedParams): Observable<QueryOrganizationPagedReturn> {
    return this.requestService.post(QUERYORGANIZATIONPAGEDLIST, params);
  }

  // 获取仓位列表
  queryStorePositionPagedListByStoreId(params: QueryStorePositionParams): Observable<QueryStorePositionReturn> {
    return this.requestService.post(QUERYSTOREPOSITIONPAGEDLISTBYSTOREID, params);
  }

  // 获取当前头部组织的列表
  queryStoreOrganization(params: { typeId: string; id: string }): Observable<QueryStoreOrganizationReturn[]> {
    return this.requestService.get(QUERYSTORE_ORGANIZATION, params);
  }

  queryStoreOrganizationListSub(params: { parentId: string }): Observable<QueryStoreOrganizationReturn[]> {
    return this.requestService.get(QUERY_STORE_ORGANIZATION_LIST_SUB, params);
  }
}
