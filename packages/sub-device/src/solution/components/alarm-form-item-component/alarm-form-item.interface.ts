import { AlarmTypeEnum } from '~/solution/shared/constant/alarm.const';
import { DurationField } from './duration-setting-component/duration-setting.interface';

/**
 * @export state变量定义和初始化
 * @class IAlarmFormItemState
 */
export class IAlarmFormItemState {
  formInfo: AlarmTypeItem[];
  durationFields: DurationField[];
}

export class IAlarmFormItemProp {
  initialInfo: Record<string, any>;
  hasTempName?: boolean;
  selectTempId?: string;
  selectTemp?: Record<string, any>[];
  getFormInfo: (formInfo: any) => void;
}

export enum FormTypeEnum {
  Input = 1,
  DurationSetting = 2
}

export interface AlarmTypeItem {
  id: string;
  alarmTemplateId: string;
  alarmKey: string;
  alarmText: string;
  alarmValue: string;
  prefix?: string;
  suffix?: string;
  type: number;
  validateText?: string;
}

export const nameTemplate: AlarmTypeItem = {
  id: '',
  alarmTemplateId: '',
  alarmKey: 'Name',
  alarmText: '模板名称',
  alarmValue: '',
  type: FormTypeEnum.Input
};
