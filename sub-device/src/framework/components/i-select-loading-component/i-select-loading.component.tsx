import * as React from 'react';
import { Select } from 'antd';
import { IISelectLoadingProps } from './i-select-loading.interface';
import { useISelectLoadingStore } from './i-select-loading.component.store';

export default function ISelectLoadingComponent(props: IISelectLoadingProps) {
  const { placeholder, disabled, getCurrentSelectInfo, width = '100%', allowClear = true, mode } = props;
  const { state, optionScroll, fetchOptions } = useISelectLoadingStore(props);
  const { optionList, fetching } = state;
  return (
    <Select
      style={{ width }}
      loading={fetching}
      mode={mode}
      disabled={disabled || false}
      placeholder={placeholder}
      filterOption={false}
      value={state.value}
      defaultValue={state.value}
      onChange={getCurrentSelectInfo}
      onPopupScroll={optionScroll}
      onFocus={() => fetchOptions(false)}
      showSearch={props.showSearch || true}
      onSearch={$event => fetchOptions(true, $event)}
      allowClear={allowClear}
    >
      {optionList &&
        optionList.map((item: { id: string | number; name: string; telephone: string }, index: number) => (
          <Select.Option value={item.id} key={`${item.id}${index}`} info={item}>
            {item.telephone ? item.name + ' ' + item.telephone : item.name}
          </Select.Option>
        ))}
    </Select>
  );
}
