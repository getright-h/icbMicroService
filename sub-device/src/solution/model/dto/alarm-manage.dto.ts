import { Observable } from 'rxjs';

export abstract class AlarmManageDTO {
  abstract queryAlarmConfig(id: string): Observable<AlarmConfig>;
  abstract setAlarmConfig(params: SetAlarmConfig): Observable<boolean>;
}

export interface AlarmPackageContent {
  id: string;
  alarmTemplateId: string;
  alarmKey: string;
  alarmText: string;
  alarmValue: string;
  groupId: string;
  createTimeStamp: number;
}

export interface AlarmConfig {
  id: string;
  pushMode: number;
  isPlatFormPush?: boolean;
  isMessagePush?: boolean;
  isWeChatPush?: boolean;
  type: number;
  typeText?: string;
  templateList: AlarmTemplateItem[];
}

export interface AlarmTemplateItem {
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
  modifyName: string;
  modifyTime: string;
  isTemplateSelected: boolean;
  packageList: AlarmPackageItem[];
}

export interface AlarmPackageItem {
  isSelected: boolean;
  isPackageCustom: boolean;
  content: AlarmPackageContent[];
  id: string;
  alarmTemplateId: string;
  alarmKey: string;
  alarmText: string;
  alarmValue: string;
  alarmUnit: string;
  groupId: string;
  createTimeStamp: number;
}

export interface SetAlarmConfig {
  id: string;
  pushMode: number;
  type: number;
  templateList: AlarmTemplateItem[];
}
