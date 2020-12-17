import { Observable } from 'rxjs';

export abstract class AlarmManageDTO {
  abstract queryAlarmTemplatePagedList(params: QueryAlarmTemplateListParam): Observable<QueryAlarmTemplateListResponse>;
  abstract setAlarmCustom(id: string): Observable<boolean>;
  abstract insertAlarmTemplatePackage(params: EditAlarmPackageItem[]): Observable<boolean>;
  abstract setAlarmTemplatePackage(params: EditAlarmPackageItem[]): Observable<boolean>;
  abstract queryTemplatePackageList(id: string): Observable<AlarmPackageContent[]>;
  abstract queryTemplatePackageDetail(id: string): Observable<AlarmPackageContent[]>;
  abstract deleteTemplatePackage(groupId: string): Observable<boolean>;
  abstract queryAlarmParamList(): Observable<AlarmParamItem[]>;
}

export interface QueryAlarmTemplateListParam {
  code: string;
  downMode: number;
  index: number;
  size: number;
  beginTime: number;
  endTime: number;
}

export interface QueryAlarmTemplateListResponse {
  dataList: AlarmTemplateListItem[];
  total: number;
}

export interface AlarmTemplateListItem {
  id: string;
  name: string;
  description: string;
  downMode: number;
  downModeText: string;
  isCustom: boolean;
  isParam: boolean;
  code: string;
  sort: number;
  modifyId: string;
  modifyTime: string;
  packageList: AlarmPackageList[];
}

interface AlarmPackageList {
  isSelected: boolean;
  isPackageCustom: boolean;
  content: AlarmPackageContent[];
  id: string;
  alarmTemplateId: string;
  alarmKey: string;
  alarmText: string;
  alarmValue: string;
  groupId: string;
  createTimeStamp: number;
}

export interface AlarmPackageContent {
  id?: string;
  alarmTemplateId?: string;
  alarmKey?: string;
  alarmText?: string;
  alarmValue?: string;
  groupId?: string;
  createTimeStamp?: number;
  packageList?: any[];
  isDefault?: boolean;
}

export interface EditAlarmPackageItem {
  id: string;
  alarmTemplateId: string;
  alarmKey: string;
  alarmText: string;
  alarmValue: string;
}

export interface AlarmParamItem {
  type: string;
  name: string;
  childList: AlarmTypeItem[];
}

export interface AlarmTypeItem {
  alarmKey: string;
  alarmText: string;
  alarmValue: string;
  type: number;
  prifix: string;
  suffix: string;
  validateText: string;
}
