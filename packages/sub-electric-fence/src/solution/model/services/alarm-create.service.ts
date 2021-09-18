import {
  CreateParams,
  AlarmListParams,
  AlermFollowParams,
  AlarmCreate,
  AlarmListReturn
} from '../dto/alarm-create.dto';
import { RequestService } from '~/framework/util/base-http/request.service';
import { Observable } from 'rxjs';
import { DepUtil } from '~/framework/aop/inject';

const ALARM_CREATE = 'fence/alarm/create';
const CREATE_BATCH = 'fence/alarm/create-batch';
const ALARM_LIST = 'fence/alarm/list';
const ALARM_FOLLOW = 'fence/alarm/follow';
@DepUtil.Injectable()
export class AlarmCreateService implements AlarmCreate {
  @DepUtil.Inject(RequestService)
  private readonly requestService: RequestService;
  alarmCreate(params: CreateParams): Observable<boolean> {
    return this.requestService.post(ALARM_CREATE, params);
  }
  alarmCreateBatch(): Observable<boolean> {
    return this.requestService.post(CREATE_BATCH);
  }
  alarmList(params: AlarmListParams): Observable<{ data: AlarmListReturn; total: number }> {
    return this.requestService.post(ALARM_LIST, params);
  }
  alarmFollow(params: AlermFollowParams): Observable<boolean> {
    return this.requestService.post(ALARM_FOLLOW, params);
  }
}
