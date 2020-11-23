import {
  StockManageDTO,
  QueryStockDeviceListParam,
  QueryStockDeviceListResult,
  QueryStockDeviceDetailResult,
  MaterialStockInParam,
  MaterialStockUpdateParam,
  QueryDeviceSelectedResult,
  QueryDeviceSelectedParam,
  QueryInOutRecordDetailResult,
  QueryInOutRecordListParam,
  QueryInOutRecordListResult,
  QueryPurchaseListParam,
  QueryPurchaseListResult,
  QueryPurchaseDetailResult,
  UpdatePurchaseParam
} from '../dto/stock-manage.dto';
import { RequestService } from '~/framework/util/base-http/request.service';
import { Observable } from 'rxjs';
import { DepUtil } from '~/framework/aop/inject';

/**
 * 真实开发中，请将示例代码移除
 */

const QUERY_STOCK_DEVICE_LIST = 'material/manage/queryStockDevicePagedList';
const QUERY_STOCK_DEVICE_DETAIL = 'material/manage/queryStockDeviceDetail';
const INSERT_PUT_STORE = 'material/manage/insertPutStore';
const SET_MATERIAL = 'material/manage/setMaterial';
const DELETE_MATERIAL = 'material/manage/material';
const LOSS_MATERIAL = 'material/manage/lossMaterial';
const QUERY_DEVICE_SELECTED = 'material/manage/queryDeviceSelected';

const QUERY_IN_OUT_RECORD_LIST = 'allot/manage/queryInOutRecordPagedList';
const QUERY_IN_OUT_RECORD_DETAIL = 'allot/manage/queryInOutRecordDetail';

const QUERY_PURCHASE_LIST = 'allot/manage/queryPurchasePagedList';
const QUERY_PURCHASE_DETAIL = 'allot/manage/queryPurchaseDetail';
const INSERT_PURCHASE = 'allot/manage/insertPurchase';
const UPDATE_PURCHASE = 'allot/manage/updatePurchase';
const DELETE_PURCHASE = 'allot/manage/purchase';

@DepUtil.Injectable()
export class StockManageService extends StockManageDTO {
  @DepUtil.Inject(RequestService)
  private readonly requestService: RequestService;
  constructor() {
    super();
  }

  // 设备列表
  queryStockDeviceList(params: QueryStockDeviceListParam): Observable<QueryStockDeviceListResult> {
    return this.requestService.post(QUERY_STOCK_DEVICE_LIST, params);
  }
  // 设备详情
  queryStockDeviceDetail(materialId: string): Observable<QueryStockDeviceDetailResult> {
    return this.requestService.get(QUERY_STOCK_DEVICE_DETAIL, { materialId });
  }
  // 设备入库
  materialStockIn(params: MaterialStockInParam): Observable<boolean> {
    return this.requestService.post(INSERT_PUT_STORE, params);
  }
  // 设备更新
  materialStockUpdate(params: MaterialStockUpdateParam): Observable<boolean> {
    return this.requestService.post(SET_MATERIAL, params);
  }
  // 删除物料
  deleteMaterial(id: string): Observable<boolean> {
    return this.requestService.delete(DELETE_MATERIAL, { materialId: id });
  }
  // 遗失物料
  lossMaterial(id: string): Observable<boolean> {
    return this.requestService.get(LOSS_MATERIAL, { materialId: id });
  }
  // 设备下拉框
  queryDeviceSelected(params: QueryDeviceSelectedParam): Observable<QueryDeviceSelectedResult> {
    return this.requestService.post(QUERY_DEVICE_SELECTED, params);
  }

  // 出入库记录
  queryInOutRecordList(params: QueryInOutRecordListParam): Observable<QueryInOutRecordListResult> {
    return this.requestService.post(QUERY_IN_OUT_RECORD_LIST, params);
  }
  // 出入库详情
  queryInOutRecordDetail(id: string): Observable<QueryInOutRecordDetailResult> {
    return this.requestService.get(QUERY_IN_OUT_RECORD_DETAIL, { id });
  }

  // 采购单列表
  queryPurchaseList(params: QueryPurchaseListParam): Observable<QueryPurchaseListResult> {
    return this.requestService.post(QUERY_PURCHASE_LIST, params);
  }
  // 采购单详情
  queryPurchaseDetail(id: string): Observable<QueryPurchaseDetailResult> {
    return this.requestService.get(QUERY_PURCHASE_DETAIL, { id });
  }
  // 新增采购单
  insertPurchase(params: UpdatePurchaseParam): Observable<boolean> {
    return this.requestService.post(INSERT_PURCHASE, params);
  }
  // 编辑采购单
  updatePurchase(params: UpdatePurchaseParam): Observable<boolean> {
    return this.requestService.post(UPDATE_PURCHASE, params);
  }
  // 删除采购单
  deletePurchase(id: string): Observable<boolean> {
    return this.requestService.delete(DELETE_PURCHASE, { id });
  }
}
