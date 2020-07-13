import {
  FenceManageListReturnModal,
  FenceManageEditParamsModal,
  FenceManageDTO,
  FenceManageCreateParamsModal,
  FenceManageDistrictReturnModal
} from '../dto/fence-manage.dto';
import { RequestService } from '~/framework/util/base-http/request.service';
import { Observable } from 'rxjs';
import { DepUtil } from '~/framework/aop/inject';

/**
 * 真实开发中，请将示例代码移除
 */

const FENCE_MANAGE_CREATE = 'fence/manage/create';
const FENCE_MANAGE_EDIT = 'fence/manage/edit';
const FENCE_MANAGE_LIST = 'fence/manage/list';
const FENCE_MANAGE_DISTRICT = 'fence/manage/district';
const FENCE_MANAGE_DELETE = 'fence/manage/delete';

@DepUtil.Injectable()
export class FenceManageService implements FenceManageDTO {
  @DepUtil.Inject(RequestService)
  private readonly requestService: RequestService;
  constructor() {}
  fenceList(params: { name: string; index: number; size: number }): Observable<Array<FenceManageListReturnModal>> {
    return this.requestService.get(FENCE_MANAGE_LIST, params);
  }
  fenceDelete(params: { id: string }): Observable<number> {
    return this.requestService.get(FENCE_MANAGE_DELETE, params);
  }

  fenceDistrict(params: { parentCode: string }): Observable<FenceManageDistrictReturnModal> {
    return this.requestService.get(FENCE_MANAGE_DISTRICT, params);
  }

  fenceEdit(params: FenceManageEditParamsModal): Observable<number> {
    return this.requestService.get(FENCE_MANAGE_EDIT, params);
  }

  fenceCreate(params: FenceManageCreateParamsModal): Observable<number> {
    return this.requestService.get(FENCE_MANAGE_CREATE, params);
  }
}
