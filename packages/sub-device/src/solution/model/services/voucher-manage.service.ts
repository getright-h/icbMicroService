import {
  VoucherManageDTO,
  DispatchListRequestParam,
  DispatchListResponse,
  DispatchDetail,
  SetDispatchParam
} from '../dto/voucher-manage.dto';
import { RequestService } from '~/framework/util/base-http/request.service';
import { Observable } from 'rxjs';
import { DepUtil } from '~/framework/aop/inject';

/**
 * 真实开发中，请将示例代码移除
 */

const DISPATCH_PAGED_LIST = 'dispatch/manage/dispatchPagedList';
const DISPATCH_DETAIL = 'dispatch/manage/dispatchDetail';
const INSERT_DISPATCH = 'dispatch/manage/insertDispatch';
const SET_DISPATCH = 'dispatch/manage/setDispatch';
const DELETE_DISPATCH = 'dispatch/manage/dispatch';

@DepUtil.Injectable()
export class VoucherManageService extends VoucherManageDTO {
  @DepUtil.Inject(RequestService)
  private readonly requestService: RequestService;
  constructor() {
    super();
  }

  // 安装单列表
  getDispatchPagedList(params: DispatchListRequestParam): Observable<DispatchListResponse> {
    return this.requestService.post(DISPATCH_PAGED_LIST, params);
  }
  // 安装单详情
  getDispatchDetail(id: string): Observable<DispatchDetail> {
    return this.requestService.get(DISPATCH_DETAIL, { id });
  }
  // 新增安装单
  insertDispatch(params: SetDispatchParam): Observable<boolean> {
    return this.requestService.post(INSERT_DISPATCH, params);
  }
  // 更新安装单
  setDispatch(params: SetDispatchParam): Observable<boolean> {
    return this.requestService.post(SET_DISPATCH, params);
  }
  // 删除安装单
  deleteDispatch(id: string): Observable<boolean> {
    return this.requestService.delete(DELETE_DISPATCH, { id });
  }
}
