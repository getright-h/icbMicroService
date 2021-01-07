import { OrderReportManage, ReportAlarmStatisticsInput } from '../dto/report-order.dto';
import { RequestService } from '~/framework/util/base-http/request.service';
import { Observable } from 'rxjs';
import { DepUtil } from '~/framework/aop/inject';

const QUERY_RESIDENT_PAGEDLIST = 'alarmCenter/manage/queryResidentPagedList';
const QUERY_MONITOR_ALARM_INFO_PAGEDLIST = 'alarmCenter/manage/queryMonitorAlarmInfoPagedList';
const QUERY_REPORT_ALARM_STATISTICS = 'alarmCenter/manage/queryReportAlarmStatistics';
const QUERY_REPORT_ALARM_STATISTICS_DETAIL = 'alarmCenter/manage/queryReportAlarmStatisticsDetail';
const QUERY_ALARM_ORIGINAL_PAGEDLIST = 'alarmCenter/manage/queryAlarmOriginalPagedList';
const QUERY_REPORT_MONITOR_ROLE_PAGEDLIST = 'alarmCenter/manage/queryReportMonitorRolePagedList';
@DepUtil.Injectable()
export class OrderReportService implements OrderReportManage {
  @DepUtil.Inject(RequestService)
  private readonly requestService: RequestService;
  queryResidentPagedList(params: ReportAlarmStatisticsInput): Observable<{ data: any[]; total: number }> {
    return this.requestService.post(QUERY_RESIDENT_PAGEDLIST, params);
  }
  queryMonitorAlarmInfoPagedList(params: ReportAlarmStatisticsInput): Observable<boolean> {
    return this.requestService.post(QUERY_MONITOR_ALARM_INFO_PAGEDLIST, params);
  }
  queryReportAlarmStatistics(params: ReportAlarmStatisticsInput): Observable<{ data: any[]; total: number }> {
    return this.requestService.post(QUERY_REPORT_ALARM_STATISTICS, params);
  }
  queryReportAlarmStatisticsDetail(params: { deviceCode: string; alarmType: string }): Observable<boolean> {
    return this.requestService.post(QUERY_REPORT_ALARM_STATISTICS_DETAIL, params);
  }
  queryAlarmOriginalPagedList(params: ReportAlarmStatisticsInput): Observable<boolean> {
    return this.requestService.post(QUERY_ALARM_ORIGINAL_PAGEDLIST, params);
  }
  queryReportMonitorRolePagedList(params: ReportAlarmStatisticsInput): Observable<boolean> {
    return this.requestService.post(QUERY_REPORT_MONITOR_ROLE_PAGEDLIST, params);
  }
}
