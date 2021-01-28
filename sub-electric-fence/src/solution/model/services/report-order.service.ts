import {
  OrderReportManage,
  ReportAlarmStatisticsInput,
  QueryReportTrafficReturn,
  PointList,
  PointPassList,
  ResidentList,
  AlarmTypeList,
  ReportMonitorAlarmGroupInput
} from '../dto/report-order.dto';
import moment from 'moment';
import { RequestService } from '~/framework/util/base-http/request.service';
import { Observable } from 'rxjs';
import { DepUtil } from '~/framework/aop/inject';
import { switchMap, map } from 'rxjs/operators';
import { REPORT_UTIL } from '~/solution/shared/util/report-manage.util';
import { IMAP } from '~/solution/shared/util/map.util';

const QUERY_RESIDENT_PAGEDLIST = 'alarmCenter/manage/queryResidentPagedList';
const QUERY_MONITOR_ALARM_INFO_PAGEDLIST = 'alarmCenter/manage/queryMonitorAlarmInfoPagedList';
const QUERY_REPORT_ALARM_STATISTICS = 'alarmCenter/manage/queryReportAlarmStatistics';
const QUERY_REPORT_ALARM_STATISTICS_DETAIL = 'alarmCenter/manage/queryReportAlarmStatisticsDetail';
const QUERY_ALARM_ORIGINAL_PAGEDLIST = 'alarmCenter/manage/queryAlarmOriginalPagedList';
const QUERY_REPORT_MONITOR_ROLE_PAGEDLIST = 'alarmCenter/manage/queryReportMonitorRolePagedList';
const QUERY_REPORT_TRAFFIC = 'alarmCenter/manage/queryReportTraffic';
const QUERY_MONITOR_ALARM_GROUP_PAGEDLIST = 'alarmCenter/manage/queryMonitorAlarmGroupPagedList';
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

  queryReportTraffic(params: {
    strValue: string;
    beginTime?: string;
    endTime?: string;
  }): Observable<QueryReportTrafficReturn> {
    const time = moment().format('YYYY-MM-DD');
    // const time = '2021-01-23';
    const timeInfo = [time + ' 00:00:00', time + ' 23:59:59'];
    // params = { ...params, beginTime: formatToUnix(timeInfo[0]), endTime: formatToUnix(timeInfo[1]) };
    params = { ...params, beginTime: timeInfo[0], endTime: timeInfo[1] };
    return this.requestService.get(QUERY_REPORT_TRAFFIC, params).pipe(
      switchMap(async data => {
        if (data.longitude && data.latitude) {
          const { longitude, latitude } = data;
          const longitudeLatitude = IMAP.initLonlat(longitude, latitude);
          data.longitude = longitudeLatitude[0];
          data.latitude = longitudeLatitude[1];
          data.currentAddressDetail = await IMAP.covertPointToAddress(longitudeLatitude);
        }
        // 定位点
        data.pointList = data.pointList.map((item: PointList) => {
          item.coordinates = IMAP.initLonlat(item.coordinates[0], item.coordinates[1]);
          return item;
        });
        let totalInfo = {
          startTime: 0,
          startLon: 0,
          startLat: 0,
          endTime: 0,
          endLon: 0,
          endLat: 0,
          mileage: 0
        };

        // 轨迹分段
        data.pointPassList = data.pointPassList?.map((item: PointPassList, index: number) => {
          // 这个时候说明要展示全路段，不然就展示个分路段
          const itemCopy = JSON.parse(JSON.stringify(item));
          if (index == 0) {
            totalInfo = itemCopy;
          }
          totalInfo.mileage += itemCopy.mileage;
          if (index == data.pointPassList.length - 1) {
            totalInfo.endLon = itemCopy.endLon;
            totalInfo.endTime = itemCopy.endTime;
            totalInfo.endLat = itemCopy.endLat;
          }
          const startLA = IMAP.initLonlat(item.startLon, item.startLat);
          item.startLon = startLA[0];
          item.startLat = startLA[1];
          const endLA = IMAP.initLonlat(item.endLon, item.endLat);
          item.endLon = endLA[0];
          item.endLat = endLA[1];
          return item;
        });
        data.pointPassList?.unshift(totalInfo);

        // 长驻点
        data.residentList = data.residentList.map((item: ResidentList) => {
          const LA = IMAP.initLonlat(item.longitude, item.latitude);
          item.longitude = LA[0];
          item.latitude = LA[1];
          item.coordinates = LA;
          return item;
        });

        // 报警提醒
        data.alarmTypeList = data.alarmTypeList.map((item: AlarmTypeList) => {
          item.alarmList = item.alarmList.map(itemChild => {
            const LA = IMAP.initLonlat(itemChild.longitude, itemChild.latitude);
            itemChild.longitude = LA[0];
            itemChild.latitude = LA[1];
            return itemChild;
          });
          return item;
        });
        return data;
      })
    );
  }

  queryMonitorAlarmGroupPagedList(params: ReportMonitorAlarmGroupInput): Observable<boolean> {
    return this.requestService.post(QUERY_MONITOR_ALARM_GROUP_PAGEDLIST, params).pipe(
      switchMap(async data => {
        const dataList = await REPORT_UTIL.formatAddress(data.dataList);
        dataList.map((item, index) => {
          item.id = item.id.slice(0, -1) + index;
        });
        return { ...data, dataList };
      })
    );
  }
}
