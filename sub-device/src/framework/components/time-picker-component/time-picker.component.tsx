import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { TimePickerStore } from './time-picker.component.store';
import { IProps } from './time-picker.interface';
import { DatePicker, TimePicker } from 'antd';
import moment from 'moment';
import style from './time-picker.component.less';

const { RangePicker } = DatePicker;

// @inject('timePickerStore')
// @observer
export default class TimePickerComponent extends React.Component<IProps> {
  private readonly store: TimePickerStore = this.props.timePickerStore;
  private startDate: string;
  static defaultProps = {
    pickerType: 'timePicker',
    dateFormat: 'YYYY-MM-DD HH:mm:ss',
    timeFormat: 'HH:mm:ss',
    timeInfo: '',
    getDateTimeInfo: () => {
      console.log('1');
    }
  };

  onChange = (value: any, dateString: any) => {
    this.props.getDateTimeInfo(dateString);
  };

  onTimeStartChange = (value: any, dateString: any) => {
    this.startDate = dateString;
  };

  onTimeEndChange = (value: any, dateString: any) => {
    this.props.getDateTimeInfo([this.startDate, dateString]);
  };

  render() {
    const { pickerType, dateFormat, timeFormat, timeInfo } = this.props;
    return (
      <div>
        {pickerType == 'timePicker' && (
          <TimePicker
            onChange={this.onChange}
            className={style.antSinglePickerStyle}
            defaultValue={timeInfo && moment(timeInfo, timeFormat)}
            format={timeFormat}
          />
        )}
        {pickerType == 'datePicker' && (
          <DatePicker
            className={style.antSinglePickerStyle}
            defaultValue={timeInfo && moment(timeInfo)}
            onChange={this.onChange}
          />
        )}
        {pickerType == 'dateTimePicker' && (
          <DatePicker
            showTime
            className={style.antSinglePickerStyle}
            defaultValue={timeInfo && moment(timeInfo)}
            placeholder="请选择时间"
            onChange={this.onChange}
          />
        )}
        {pickerType == 'timeRange' && (
          <div>
            <TimePicker
              defaultValue={timeInfo && timeInfo.length > 1 && moment(timeInfo[0], timeFormat)}
              className={style.antTimeRangePicker}
              onChange={this.onTimeStartChange}
              format={timeFormat}
            />
            <span> ~ </span>
            <TimePicker
              defaultValue={timeInfo && timeInfo.length > 1 && moment(timeInfo[0], timeFormat)}
              className={style.antTimeRangePicker}
              onChange={this.onTimeEndChange}
              format={timeFormat}
            />
          </div>
        )}
        {pickerType == 'dateRange' && (
          <RangePicker
            defaultValue={
              timeInfo && timeInfo.length > 1 && [moment(timeInfo[0], dateFormat), moment(timeInfo[1], dateFormat)]
            }
            onChange={this.onChange}
          />
        )}
        {pickerType == 'dateTimeRange' && (
          <RangePicker
            defaultValue={
              timeInfo && timeInfo.length > 1 && [moment(timeInfo[0], dateFormat), moment(timeInfo[1], dateFormat)]
            }
            showTime={{ format: timeFormat }}
            format={dateFormat}
            placeholder={['开始时间', '结束时间']}
            onChange={this.onChange}
          />
        )}
      </div>
    );
  }
}
