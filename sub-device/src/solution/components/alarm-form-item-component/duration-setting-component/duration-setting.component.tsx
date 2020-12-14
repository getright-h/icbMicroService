import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Form, Input, TimePicker } from 'antd';
import moment from 'moment';
import * as React from 'react';
import style from './duration-setting.component.less';
import { useDurationSettingStore } from './duration-setting.component.store';
import { IDurationSettingProps } from './duration-setting.interface';

export default function DurationSettingComponent(props: IDurationSettingProps) {
  const { state, addField, removeField, changeFieldValue } = useDurationSettingStore(props);
  const { durationFields } = state;

  const commonStyle = {
    display: 'inline-block',
    marginBottom: '5px'
  };

  return (
    <React.Fragment>
      {durationFields &&
        durationFields.map((field: any, index: number) => (
          <div key={field.fieldId}>
            <Form.Item
              // name={['Duration', index, 'Begin']}
              // initialValue={field.Begin && moment(field.Begin, 'HH:mm:ss')}
              style={{ width: '120px', ...commonStyle }}
              rules={[{ required: true, message: '请选择时间' }]}
            >
              <TimePicker
                placeholder="开始时间"
                defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
                value={field.Begin && moment(field.Begin, 'HH:mm:ss')}
                onChange={(value: moment.Moment, dateString: string) => changeFieldValue(index, 'Begin', dateString)}
              />
            </Form.Item>
            <Form.Item
              // name={['Duration', index, 'End']}
              // initialValue={field.End && moment(field.End, 'HH:mm:ss')}
              style={{ width: '120px', ...commonStyle }}
              rules={[{ required: true, message: '请选择时间' }]}
            >
              <TimePicker
                placeholder="结束时间"
                defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
                value={field.End && moment(field.End, 'HH:mm:ss')}
                onChange={(value: moment.Moment, dateString: string) => changeFieldValue(index, 'End', dateString)}
              />
            </Form.Item>
            <Form.Item
              // name={['Duration', index, 'Speed']}
              // initialValue={field.Speed}
              style={{ width: '150px', ...commonStyle }}
              rules={[{ required: true, message: '请填写速度' }]}
            >
              <Input
                placeholder="请填写速度"
                suffix="km/h"
                value={field.Speed}
                onChange={e => changeFieldValue(index, 'Speed', e.target.value)}
              />
            </Form.Item>
            <div className={style.fieldAddButton}>
              <PlusOutlined
                onClick={() => {
                  addField();
                }}
              />
              <MinusOutlined
                onClick={() => {
                  removeField(index);
                }}
              />
            </div>
          </div>
        ))}
    </React.Fragment>
  );
}
