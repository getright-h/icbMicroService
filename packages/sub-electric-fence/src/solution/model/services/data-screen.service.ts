import {
  AlarmStatRequest,
  AlarmStatReturn,
  DataScreenDTO,
  FenceStatReturn,
  GpsStatRequest,
  GpsStatReturn,
  TotalStatReturn
} from '../dto/data-screen.dto';
import { RequestService } from '~/framework/util/base-http/request.service';
import { Observable } from 'rxjs';
import { DepUtil } from '~/framework/aop/inject';
import { map } from 'rxjs/operators';

/**
 * 真实开发中，请将示例代码移除
 */

const GET_FENCE_STAT = 'fence/vehicle/panel';
const GET_TOTAL_STAT = 'vehicle/manage/panel';
const GET_ALARM_STAT = 'alarmCenter/manage/panel';
const GET_GPS_STAT = 'gps/manage/panel';

@DepUtil.Injectable()
export class DataScreenService extends DataScreenDTO {
  @DepUtil.Inject(RequestService)
  private readonly requestService: RequestService;
  constructor() {
    super();
  }

  getFenceStat(organizationIds?: string[]): Observable<FenceStatReturn> {
    return this.requestService.post(GET_FENCE_STAT, { organizationIds });
  }

  getTotalStat(organizationIds?: string[]): Observable<TotalStatReturn> {
    return this.requestService.post(GET_TOTAL_STAT, { organizationIds });
  }

  getAlarmStat(params: AlarmStatRequest): Observable<AlarmStatReturn> {
    return this.requestService.post(GET_ALARM_STAT, params);
  }

  getGpsStat(params: GpsStatRequest): Observable<GpsStatReturn> {
    return this.requestService.post(GET_GPS_STAT, params);
  }
}
