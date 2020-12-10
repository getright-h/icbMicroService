import { AlarmManageDTO, AlarmConfig, SetAlarmConfig } from '../dto/alarm-manage.dto';
import { RequestService } from '~/framework/util/base-http/request.service';
import { Observable } from 'rxjs';
import { DepUtil } from '~/framework/aop/inject';

/**
 * 真实开发中，请将示例代码移除
 */

const QUERY_ALARM_CONFIG = 'gps/manage/queryAlarmConfig';
const SET_ALARM_CONFIG = 'gps/manage/setAlarmConfig';

@DepUtil.Injectable()
export class AlarmManageService extends AlarmManageDTO {
  @DepUtil.Inject(RequestService)
  private readonly requestService: RequestService;
  constructor() {
    super();
  }

  queryAlarmConfig(id: string): Observable<AlarmConfig> {
    return this.requestService.get(QUERY_ALARM_CONFIG, { id });
  }

  setAlarmConfig(params: SetAlarmConfig): Observable<boolean> {
    return this.requestService.post(SET_ALARM_CONFIG, params);
  }
}
