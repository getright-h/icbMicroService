import * as React from 'react';
import style from './i-select-loading.component.less';
import { Select } from 'antd';
import { IISelectLoadingProps } from './i-select-loading.interface';
import { useISelectLoadingStore } from './i-select-loading.component.store';

export default function ISelectLoadingComponent(props: IISelectLoadingProps) {
  const {
    placeholder,
    disabled,
    showSearch = true,
    allowClear = true,
    getCurrentSelectInfo,
    dropdownMatchSelectWidth
  } = props;
  const { state, optionScroll, fetchOptions } = useISelectLoadingStore(props);
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
      showSearch={showSearch}
      onSearch={$event => fetchOptions(true, $event)}
      allowClear={allowClear}
      dropdownMatchSelectWidth={dropdownMatchSelectWidth ? true : undefined}
    >
      {optionList &&
        optionList.map((item: any) => (
          <Select.Option value={item.id} key={item.id} info={item}>
            {item.name}
          </Select.Option>
        ))}
    </Select>
  );
}
