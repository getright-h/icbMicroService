import { OrderReportManage, ReportAlarmStatisticsInput } from '../dto/report-order.dto';
import { RequestService } from '~/framework/util/base-http/request.service';
import { Observable } from 'rxjs';
import { DepUtil } from '~/framework/aop/inject';
import { switchMap } from 'rxjs/operators';
import { REPORT_UTIL } from '~/solution/shared/util/report-manage.util';

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
  queryResidentPagedList(params: ReportAlarmStatisticsInput): Observable<{ dataList: any[]; total: number }> {
    return this.requestService.post(QUERY_RESIDENT_PAGEDLIST, params).pipe(
      switchMap(async data => {
        const dataList = await REPORT_UTIL.formatAddress(data.dataList);
        for (const item of dataList) {
          const { stayAvg, stayDuration } = item;
          item.stayAvgText = REPORT_UTIL.formatStayTime(stayAvg);
          item.stayDurationText = REPORT_UTIL.formatStayTime(stayDuration);
        }
        return { ...data, dataList };
      })
    );
  }
  queryMonitorAlarmInfoPagedList(params: ReportAlarmStatisticsInput): Observable<boolean> {
    return this.requestService.post(QUERY_MONITOR_ALARM_INFO_PAGEDLIST, params);
  }
  queryReportAlarmStatistics(params: ReportAlarmStatisticsInput): Observable<{ data: any[]; total: number }> {
    return this.requestService.post(QUERY_REPORT_ALARM_STATISTICS, params).pipe(
      switchMap(async data => {
        const dataList = await REPORT_UTIL.formatAddress(data.dataList);
        return { ...data, dataList };
      })
    );
  }
  queryReportAlarmStatisticsDetail(params: {
    deviceCode: string;
    alarmType: string;
    index: number;
    size: number;
  }): Observable<boolean> {
    return this.requestService.post(QUERY_REPORT_ALARM_STATISTICS_DETAIL, params);
  }
  queryAlarmOriginalPagedList(params: ReportAlarmStatisticsInput): Observable<boolean> {
    return this.requestService.post(QUERY_ALARM_ORIGINAL_PAGEDLIST, params).pipe(
      switchMap(async data => {
        const dataList = await REPORT_UTIL.formatAddress(data.dataList);
        return { ...data, dataList };
      })
    );
  }
  queryReportMonitorRolePagedList(params: ReportAlarmStatisticsInput): Observable<boolean> {
    return this.requestService.post(QUERY_REPORT_MONITOR_ROLE_PAGEDLIST, params).pipe(
      switchMap(async data => {
        const dataList = await REPORT_UTIL.formatAddress(data.dataList);
        return { ...data, dataList };
      })
    );
  }
}
