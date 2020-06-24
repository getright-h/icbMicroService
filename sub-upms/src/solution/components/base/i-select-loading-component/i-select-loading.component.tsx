import * as React from 'react';
import style from './i-select-loading.component.less';
import { Select } from 'antd';
import { IISelectLoadingProps } from './i-select-loading.interface';
import { useISelectLoadingStore } from './i-select-loading.component.store';

export default function ISelectLoadingComponent(props: IISelectLoadingProps) {
  const { placeholder, disabled, selectedValue, getCurrentSelectInfo } = props;
  const { state, optionData, optionScroll, onClick } = useISelectLoadingStore(props);
  const { fetching } = state;
  return (
    <Select
      loading={fetching}
      disabled={disabled || false}
      placeholder={placeholder}
      value={selectedValue}
      onChange={getCurrentSelectInfo}
      onPopupScroll={optionScroll}
      onClick={onClick}
      allowClear={true}
    >
      {optionData.current &&
        optionData.current.map((item: { id: string | number; name: string }) => (
          <Select.Option value={item.id} key={item.id} info={item}>
            {item.name}
          </Select.Option>
        ))}
    </Select>
  );
}
