import * as React from 'react';
import style from './i-select-loading.component.less';
import { Select } from 'antd';
import { IISelectLoadingProps } from './i-select-loading.interface';
import { useISelectLoadingStore } from './i-select-loading.component.store';

export default function ISelectLoadingComponent(props: IISelectLoadingProps) {
  const { placeholder, defaultValue, showSearch, getCurrentSelectInfo } = props;
  const { state, optionData, optionScroll, fetchOptions } = useISelectLoadingStore(props);
  const { fetching } = state;
  return (
    <Select
      showSearch={showSearch || false}
      placeholder={placeholder}
      onSearch={fetchOptions}
      defaultValue={defaultValue}
      onSelect={getCurrentSelectInfo}
      onPopupScroll={optionScroll}
      onFocus={() => fetchOptions('')}
      loading={fetching}
      allowClear={true}
    >
      {optionData.current &&
        optionData.current.map((item: { id: string | number; name: React.ReactNode }) => (
          <Select.Option value={item.id} key={item.id} info={item}>
            {item.name}
          </Select.Option>
        ))}
    </Select>
  );
}
