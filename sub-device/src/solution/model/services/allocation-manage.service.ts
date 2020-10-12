import { RequestService } from '~/framework/util/base-http/request.service';
import { Observable } from 'rxjs';
import { DepUtil } from '~/framework/aop/inject';

// 调拨流程处理
const SET_ALLOT_FLOW = 'allot/manage/setAllotFlow';
// 新增调拨单
const INSERT_ALLOT = 'allot/manage/insertAllot';
// 更新调拨单
const UPDATE_ALLOT = 'allot/manage/setAllot';
// 删除调拨单
const DELETE_ALLOT = 'allot/manage/allot';
// 调拨单
const QUERY_ALLOT_PAGED_LIST = 'allot/manage/queryAllotPagedList';
// 调拨单详情
const ALLOT_DETAIL = 'allot/manage/allotDetail';
// 发起调拨分页列表
const QUERY_ALLOT_PROMOTER_PAGED_LIST = 'allot/manage/queryAllotPromoterPagedList';
// 发起调拨详情
const QUERY_ALL_PROMOTER_DETAIL = 'allot/manage/queryAllPromoterDetail';
// 接收调拨分页列表
const QUERY_ALLOT_RECIPIENT_PAGED_LIST = 'allot/manage/queryAllotRecipientPagedList';
// 接收调拨详情
const QUERY_ALLOT_RECIPIENT_DETAIL = 'allot/manage/queryAllotRecipientDetail';
@DepUtil.Injectable()
export class AllocationManageService {
  @DepUtil.Inject(RequestService)
  private readonly requestService: RequestService;

  setAllotFlow(params: any): Observable<any> {
    return this.requestService.post(SET_ALLOT_FLOW, params);
  }
  insertAllot(params: any): Observable<any> {
    return this.requestService.post(INSERT_ALLOT, params);
  }
  updateAllot(params: any): Observable<any> {
    return this.requestService.post(UPDATE_ALLOT, params);
  }
  deleteAllot(params: any): Observable<any> {
    return this.requestService.delete(DELETE_ALLOT, params);
  }
  queryAllotPagedList(params: any): Observable<any> {
    return this.requestService.post(QUERY_ALLOT_PAGED_LIST, params);
  }
  allotDetail(params: any): Observable<any> {
    return this.requestService.get(ALLOT_DETAIL, params);
  }
  queryAllotPromoterPagedList(params: any): Observable<any> {
    return this.requestService.post(QUERY_ALLOT_PROMOTER_PAGED_LIST, params);
  }
  queryAllPromoterDetail(params: any): Observable<any> {
    return this.requestService.get(QUERY_ALL_PROMOTER_DETAIL, params);
  }
  queryAllotRecipientPagedList(params: any): Observable<any> {
    return this.requestService.post(QUERY_ALLOT_RECIPIENT_PAGED_LIST, params);
  }
  queryAllotRecipientDetail(params: any): Observable<any> {
    return this.requestService.get(QUERY_ALLOT_RECIPIENT_DETAIL, params);
  }
}
