import { Form, Input } from 'antd';
import * as React from 'react';
import style from './alarm-form-item.component.less';
import { useAlarmFormItemStore } from './alarm-form-item.component.store';
import { AlarmTypeItem, FormTypeEnum, IAlarmFormItemProp } from './alarm-form-item.interface';
import DurationSettingComponent from './duration-setting-component/duration-setting.component';

export default function AlarmFormItemComponent(props: IAlarmFormItemProp) {
  const { state, handleInputChange, durationFieldsChange } = useAlarmFormItemStore(props);
  const { formInfo, durationFields } = state;
  const { isEnbaleEdit = true, extraEle = null } = props;
  function CustomComponent(item: AlarmTypeItem, index: number) {
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
              {/* 暂时显示第一位，其他的后续更改 */}
              {index == 0 && extraEle}
            </div>
            {item.validateText && <span>填写范围：{item.validateText}</span>}
          </Form.Item>
        );
        break;
      case FormTypeEnum.DurationSetting:
        returnElement = (
          <Form.Item name={item.alarmKey} label={item.alarmText} key={item.alarmKey} required={true}>
            <DurationSettingComponent initialFields={durationFields} getFieldsChange={durationFieldsChange} />
            {/* 暂时显示第一位，其他的后续更改 */}
            {index == 0 && extraEle}
          </Form.Item>
        );
        break;
    }
    return returnElement;
  }

  return (
    <React.Fragment>
      {formInfo && formInfo.map((item: AlarmTypeItem, index: number) => CustomComponent(item, index))}
    </React.Fragment>
  );
}
