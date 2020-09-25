import { Select } from 'antd';
import * as React from 'react';
import style from './i-select-device.component.less';
import { useISelectDeviceStore } from './i-select-device.component.store';
import { IISelectDeviceProps } from './i-select-device.interface';

export default function ISelectDeviceComponent(props:IISelectDeviceProps) {
  const { placeholder, disabled, getCurrentSelectInfo } = props;
  const { state, optionScroll, fetchOptions } = useISelectDeviceStore(props);
  const { optionList, fetching } = state;
  return (
    <Select
      loading={fetching}
      disabled={disabled || false}
      placeholder={placeholder}
      filterOption={false}
      value={state.value}
      defaultValue={state.value}
      onChange={getCurrentSelectInfo}
      onPopupScroll={optionScroll}
      // onFocus={!optionList.length ? () => fetchOptions(false) : () => {}}
      onFocus={() => fetchOptions(false)}
      showSearch={props.showSearch || true}
      // onSearch={$event => fetchOptions(true, $event)}
      allowClear={true}
    >
      {optionList &&
        optionList.map((item: { id: string | number; name: string }, index: number) => (
          <Select.Option value={item.id} key={`${item.id}${index}`} info={item}>
            {item.name}
          </Select.Option>
        ))}
    </Select>
  );
}
