import { DurationField } from './duration-setting-component/duration-setting.interface';
import { AlarmPackageContent } from '~/solution/model/dto/alarm-manage.dto';

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
  tempalteValue?: AlarmPackageContent[];
  getFormInfo: (formInfo: any) => void;
  isEnbaleEdit?: boolean;
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
