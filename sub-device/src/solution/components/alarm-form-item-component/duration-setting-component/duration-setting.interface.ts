import { Moment } from 'moment';

/**
 * @export state变量定义和初始化
 * @class IDurationSettingState
 */
export class IDurationSettingState {
  durationFields: DurationField[];
}

export class IDurationSettingProps {
  initialFields: any[];
  getFieldsChange: (fields: DurationField[]) => void;
}

export interface DurationField {
  fieldId: string;
  Begin?: Moment;
  End?: Moment;
  Speed?: number;
}
