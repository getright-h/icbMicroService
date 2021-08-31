import { TimePickerStore } from './time-picker.component.store';

export interface IProps {
  timePickerStore?: TimePickerStore;
  getDateTimeInfo?: Function;
  pickerType?: string;
  timeInfo?: string | Array<string>;
  timeFormat?: string;
  dateFormat?: string;
}