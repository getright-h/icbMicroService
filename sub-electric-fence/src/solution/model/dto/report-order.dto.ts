import { Observable } from 'rxjs';

/**
 * 真实开发中，请将示例代码移除
 */

export interface OrderReportManage {
    // 你的抽象方法，具体在 Service 中实现
    queryResidentPagedList(params: ReportAlarmStatisticsInput): Observable<{ dataList: any[], total: number }>;
    queryMonitorAlarmInfoPagedList(params: ReportAlarmStatisticsInput): Observable<boolean>;
    queryReportAlarmStatistics(params: ReportAlarmStatisticsInput): Observable<{ data: any[], total: number }>;
    queryReportAlarmStatisticsDetail(params: { deviceCode: string; alarmType: string }): Observable<boolean>;
    queryAlarmOriginalPagedList(params: ReportAlarmStatisticsInput): Observable<boolean>;
}


export interface ReportAlarmStatisticsInput {
    strValue : string; //,
    alarmType : number; // = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '-1']
    organizationId : string; //,
    index : number; //,
    size : number; //,
    beginTime : number; //,
    endTime : number; //
}
