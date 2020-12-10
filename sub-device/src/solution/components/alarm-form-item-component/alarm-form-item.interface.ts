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
}

export const nameTemplate: AlarmTypeItem = {
  id: '',
  alarmTemplateId: '',
  alarmKey: 'Name',
  alarmText: '模板名称',
  alarmValue: '',
  type: FormTypeEnum.Input
};

export const alarmTypeTemplates: Record<string, AlarmTypeItem[]> = {
  [AlarmTypeEnum.Collide]: [
    {
      id: '',
      alarmTemplateId: '',
      alarmKey: 'Level',
      alarmText: '碰撞强度',
      alarmValue: '',
      type: FormTypeEnum.Input,
      suffix: 'G'
    }
  ],
  [AlarmTypeEnum.Running]: [
    {
      id: '',
      alarmTemplateId: '',
      alarmKey: 'Duration',
      alarmText: '时间段设置',
      alarmValue: '',
      type: FormTypeEnum.DurationSetting
    }
  ],
  [AlarmTypeEnum.Motion]: [
    {
      id: '',
      alarmTemplateId: '',
      alarmKey: 'Level',
      alarmText: '震动强度',
      alarmValue: '',
      type: FormTypeEnum.Input
    }
  ],
  [AlarmTypeEnum.Speeding]: [
    {
      id: '',
      alarmTemplateId: '',
      alarmKey: 'Speed',
      alarmText: '限速设置',
      alarmValue: '',
      type: FormTypeEnum.Input,
      suffix: 'km/h'
    }
  ],
  [AlarmTypeEnum.Segregate]: [
    {
      id: '',
      alarmTemplateId: '',
      alarmKey: 'Distance',
      alarmText: '分离距离',
      alarmValue: '',
      type: FormTypeEnum.Input,
      suffix: 'm'
    }
  ],
  [AlarmTypeEnum.Offline]: [
    {
      id: '',
      alarmTemplateId: '',
      alarmKey: 'Duration',
      alarmText: '离线时长',
      alarmValue: '',
      type: FormTypeEnum.Input,
      prefix: '≥',
      suffix: 'min'
    }
  ],
  [AlarmTypeEnum.LongStay]: [
    {
      id: '',
      alarmTemplateId: '',
      alarmKey: 'Duration',
      alarmText: '停止时长',
      alarmValue: '',
      type: FormTypeEnum.Input,
      prefix: '≥',
      suffix: 'min'
    }
  ],
  // [AlarmTypeEnum.RiskArea]: [
  //   {
  //     id: '',
  //     alarmTemplateId: '',
  //     alarmKey: 'Location',
  //     alarmText: '高危区域',
  //     alarmValue: '',
  //     type: FormTypeEnum.LocationSelect
  //   }
  // ],
  [AlarmTypeEnum.Focus]: [
    {
      id: '',
      alarmTemplateId: '',
      alarmKey: 'Radius',
      alarmText: '区域半径',
      alarmValue: '',
      suffix: 'm',
      type: FormTypeEnum.Input
    },
    {
      id: '',
      alarmTemplateId: '',
      alarmKey: 'Number',
      alarmText: '聚集车辆',
      alarmValue: '',
      suffix: '辆',
      type: FormTypeEnum.Input
    }
  ]
};
