import {
  AlarmManageDTO,
  AlarmPackageContent,
  EditAlarmPackageItem,
  QueryAlarmTemplateListParam,
  QueryAlarmTemplateListResponse
} from '../dto/alarm-manage.dto';
import { RequestService } from '~/framework/util/base-http/request.service';
import { Observable } from 'rxjs';
import { DepUtil } from '~/framework/aop/inject';

/**
 * 真实开发中，请将示例代码移除
 */

const QUERY_ALARM_TEMPLATE_LIST = 'gps/manage/queryAlarmTemplatePagedList';
const SET_ALARM_CUSTOM = 'gps/manage/setAlarmCustom';
const INSERT_ALARM_TEMPLATE = 'gps/manage/insertAlarmTemplatePackage';
const SET_ALARM_TEMPLATE = 'gps/manage/setAlarmTemplatePackage';
const QUERY_TEMPLATE_PACKAGE_LIST = 'gps/manage/queryTemplatePackageList';
const QUERY_TEMPLATE_PACKAGE_DETAIL = 'gps/manage/queryTemplatePackageDetail';

@DepUtil.Injectable()
export class AlarmManageService extends AlarmManageDTO {
  @DepUtil.Inject(RequestService)
  private readonly requestService: RequestService;
  constructor() {
    super();
  }

  queryAlarmTemplatePagedList(params: QueryAlarmTemplateListParam): Observable<QueryAlarmTemplateListResponse> {
    return this.requestService.post(QUERY_ALARM_TEMPLATE_LIST, params);
  }

  setAlarmCustom(id: string): Observable<boolean> {
    return this.requestService.get(SET_ALARM_CUSTOM, { id });
  }

  insertAlarmTemplatePackage(params: EditAlarmPackageItem[]): Observable<boolean> {
    return this.requestService.post(INSERT_ALARM_TEMPLATE, { alarmPackageList: params });
  }

  setAlarmTemplatePackage(params: EditAlarmPackageItem[]): Observable<boolean> {
    return this.requestService.post(SET_ALARM_TEMPLATE, { alarmPackageList: params });
  }

  queryTemplatePackageList(id: string): Observable<AlarmPackageContent[]> {
    return this.requestService.get(QUERY_TEMPLATE_PACKAGE_LIST, { id });
  }

  queryTemplatePackageDetail(id: string): Observable<AlarmPackageContent[]> {
    return this.requestService.get(QUERY_TEMPLATE_PACKAGE_DETAIL, { id });
  }
}
