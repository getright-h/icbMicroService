import { Form, Input } from 'antd';
import React from 'react';
import style from './alarm-form-item.component.less';
import { useAlarmFormItemStore } from './alarm-form-item.component.store';
import { AlarmTypeItem, FormTypeEnum, IAlarmFormItemProp } from './alarm-form-item.interface';
import DurationSettingComponent from './duration-setting-component/duration-setting.component';

export default function AlarmFormItemComponent(props: IAlarmFormItemProp) {
  const { state, handleInputChange, durationFieldsChange } = useAlarmFormItemStore(props);
  const { formInfo, durationFields } = state;
  const { isEnbaleEdit = true } = props;
  function CustomComponent(item: AlarmTypeItem) {
    let returnElement: JSX.Element = null;
    const itemProps = {
      style: { width: '200px' }
    };
    switch (item.type) {
      case FormTypeEnum.Input:
        returnElement = (
          <Form.Item label={item.alarmText} key={item.alarmKey} required={true}>
            <div className={style.inputContainer}>
              <Input
                disabled={!isEnbaleEdit}
                placeholder={`请输入${item.alarmText}`}
                {...itemProps}
                onChange={e => handleInputChange(e.target.value, item)}
                value={item.alarmValue}
                prefix={item.prefix}
                suffix={item.suffix || null}
              />
            </div>
            {item.validateText && <span>填写范围：{item.validateText}</span>}
          </Form.Item>
        );
        break;
      case FormTypeEnum.DurationSetting:
        returnElement = (
          <Form.Item name={item.alarmKey} label={item.alarmText} key={item.alarmKey} required={true}>
            <DurationSettingComponent initialFields={durationFields} getFieldsChange={durationFieldsChange} />
          </Form.Item>
        );
        break;
    }
    return returnElement;
  }

  return <React.Fragment>{formInfo && formInfo.map((item: AlarmTypeItem) => CustomComponent(item))}</React.Fragment>;
}
