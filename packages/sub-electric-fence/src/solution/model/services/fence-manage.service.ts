import {
  FenceManageListReturnModal,
  FenceManageEditParamsModal,
  FenceManageDTO,
  FenceManageCreateParamsModal,
  FenceManageDistrictReturnModal,
  FenceDistrictInfoReturn,
  AreaVehicleReqType,
  AreaVehicleListData
} from '../dto/fence-manage.dto';
import { RequestService } from '~/framework/util/base-http/request.service';
import { Observable } from 'rxjs';
import { DepUtil } from '~/framework/aop/inject';
import { switchMap } from 'rxjs/operators';
import { REPORT_UTIL } from '~/solution/shared/util/report-manage.util';

/**
 * 真实开发中，请将示例代码移除
 */

const FENCE_MANAGE_CREATE = 'fence/manage/create';
const FENCE_MANAGE_EDIT = 'fence/manage/edit';
const FENCE_MANAGE_LIST = 'fence/manage/list';
const FENCE_MANAGE_DISTRICT = 'fence/manage/district';
const FENCE_MANAGE_DELETE = 'fence/manage/delete';
const FENCE_MANAGE_DISTRICTINFO = 'fence/manage/district-info';
const QUERY_AREA_VEHICLE = 'fence/manage/queryAreaVehicle';

@DepUtil.Injectable()
export class FenceManageService implements FenceManageDTO {
  @DepUtil.Inject(RequestService)
  private readonly requestService: RequestService;
  constructor() {}

  fenceList(params: {
    name: string;
    index: number;
    size: number;
  }): Observable<{ data: Array<FenceManageListReturnModal>; total: number }> {
    return this.requestService.post(FENCE_MANAGE_LIST, params);
  }
  fenceDelete(params: { id: string }): Observable<number> {
    return this.requestService.get(FENCE_MANAGE_DELETE, params);
  }

  fenceDistrict(params: { parentCode: string }): Observable<{ data: FenceManageDistrictReturnModal }> {
    return this.requestService.get(FENCE_MANAGE_DISTRICT, params);
  }

  fenceEdit(params: FenceManageEditParamsModal): Observable<number> {
    return this.requestService.post(FENCE_MANAGE_EDIT, params);
  }

  fenceCreate(params: FenceManageCreateParamsModal): Observable<number> {
    return this.requestService.post(FENCE_MANAGE_CREATE, params);
  }

  fenceDistrictInfo(params: { adcode: string }): Observable<FenceDistrictInfoReturn> {
    return this.requestService.get(FENCE_MANAGE_DISTRICTINFO, params);
  }

  queryAreaVehicle(params: AreaVehicleReqType): Observable<{ data: Array<AreaVehicleListData>; total: number }> {
    // return this.requestService.post(QUERY_AREA_VEHICLE, params);
    return this.requestService.post(QUERY_AREA_VEHICLE, params).pipe(
      switchMap(async (data: { total: number; dataList: AreaVehicleListData[] }) => {
        let dataList: any = [];
        if (Array.isArray(data.dataList)) {
          dataList = await REPORT_UTIL.formatAddress(data.dataList, 'lg', 'lt');
        }
        return { ...data, dataList };
      })
    );
  }
}
