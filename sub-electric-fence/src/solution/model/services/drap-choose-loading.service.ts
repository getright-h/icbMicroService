import { DrapChooseLoadingDTO, DrapChooseLoadingParam, DrapChooseLoadingReturn } from '../dto/drap-choose-loading.dto';
import { RequestService } from '~/framework/util/base-http/request.service';
import { Observable } from 'rxjs';

/**
 * 真实开发中，请将示例代码移除
 */
const FENCE_MANAGE_LIST = 'fence/manage/list';
const FENCE_DDL_BELONG = 'fence/vehicle/ddl-vehicle-belong';
const MANAGE_LIST = 'distributor/manage/list';
const VEHICLE_INFO = 'fence/vehicle/ddl-vehicle-info';
export class DrapChooseLoadingService extends DrapChooseLoadingDTO {
  private readonly requestService: RequestService = new RequestService();
  constructor() {
    super();
  }

  fenceList(params: { name: string; index: number; size: number }): Observable<any> {
    return this.requestService.post(FENCE_MANAGE_LIST, params);
  }

  manageList(params: DrapChooseLoadingParam): Observable<{ dataList: DrapChooseLoadingReturn[]; total: number }> {
    return this.requestService.get(MANAGE_LIST, params);
  }

  fenceDdlBelong(params: { key: string }) {
    return this.requestService.get(FENCE_DDL_BELONG, params);
  }

  fenceDdlVehicleInfo(params: { key: string }) {
    return this.requestService.get(VEHICLE_INFO, params);
  }
}
