import {
  WarehouseListDTO,
  QueryOrganizationPagedReturn,
  QueryOrganizationPagedParams,
  QueryStorePositionParams,
  QueryStorePositionReturn,
  QueryStoreOrganizationReturn,
  VStoreSimple,
  InsertStorePositionParams
} from '../dto/warehouse-list.dto';
import { RequestService } from '~/framework/util/base-http/request.service';
import { Observable } from 'rxjs';
import { DepUtil } from '~/framework/aop/inject';
import { AddWarehouseParams } from '~/solution/model/dto/warehouse-list.dto';

const QUERYORGANIZATIONPAGEDLIST = 'store/manage/queryOrganizationPagedList';
const QUERYSTOREPOSITIONPAGEDLISTBYSTOREID = 'store/manage/queryStorePositionPagedListByStoreId';
const QUERYSTORE_ORGANIZATION = 'store/manage/queryStoreOrganization';
const QUERY_STORE_ORGANIZATION_LIST_SUB = 'store/manage/queryStoreOrganizationListSub';
const INSERT_STORE = 'store/manage/insertStore';
const QUERYSTORE_LIST_BY_ORGANIZATIONID = 'store/manage/queryStoreListByOrganizationId';
const DELETE_WAREHOUSE = 'store/manage/store';
const DELETE_STOREPOSITION = 'store/manage/storePosition';
const INSERT_STORE_POSITION = 'store/manage/insertStorePosition';
const STORE_POSITION_DETAIL = 'store/manage/storePositionDetail';
const UPDATE_STORE_POSITION = 'store/manage/updateStorePosition';
const STORE_DETAIL = 'store/manage/storeDetail';
const UPDATE_STORE = 'store/manage/updateStore';
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

  // 获取子集组织
  queryStoreOrganizationListSub(params: { parentId: string }): Observable<QueryStoreOrganizationReturn[]> {
    return this.requestService.get(QUERY_STORE_ORGANIZATION_LIST_SUB, params);
  }
  // 添加仓库
  insertStore(params: AddWarehouseParams) {
    return this.requestService.post(INSERT_STORE, params);
  }

  // 编辑仓库
  updateStore(params: AddWarehouseParams) {
    return this.requestService.post(UPDATE_STORE, params);
  }

  // 根据Id查询仓库列表
  queryStoreListByOrganizationId(params: { organizationId: string }): Observable<VStoreSimple[]> {
    return this.requestService.get(QUERYSTORE_LIST_BY_ORGANIZATIONID, params);
  }

  // 删除当前的仓库
  deleteWarehouse(params: { storeId: string }) {
    return this.requestService.delete(DELETE_WAREHOUSE, params);
  }

  // 存储当前仓位
  deleteStorePosition(params: { storeId: string; id: string }) {
    return this.requestService.delete(DELETE_STOREPOSITION, params);
  }

  // 新增仓位
  insertStorePosition(params: InsertStorePositionParams) {
    return this.requestService.post(INSERT_STORE_POSITION, params);
  }

  // 仓位详情
  getStorePositionDetail(params: { id: string }) {
    return this.requestService.get(STORE_POSITION_DETAIL, params);
  }

  // 编辑仓位
  updateStorePosition(params: InsertStorePositionParams) {
    return this.requestService.post(UPDATE_STORE_POSITION, params);
  }

  // 仓库详情
  getStoreDetail(params: { id: string }) {
    return this.requestService.get(STORE_DETAIL, params);
  }
}
