import * as React from 'react';
import style from './i-select-loading.component.less';
import { Select, Spin } from 'antd';
import { IISelectLoadingProps } from './i-select-loading.interface';
import { useISelectLoadingStore } from './i-select-loading.component.store';
const { Option } = Select;
export default function ISelectLoadingComponent(props: IISelectLoadingProps) {
  const { placeholder, getCurrentSelectInfo, disabled } = props;
  const { state, getOptionListDebouce } = useISelectLoadingStore(props);
  const { optionList, fetching } = state;

  const options = optionList.map((item: { id?: string | number; name?: string; key: string; value: string }) => {
    return (
      <Option value={JSON.stringify(item)} key={item.id || item.key} info={item}>
        {item.name || item.value}
      </Option>
    );
  });

  return (
    <Select
      showSearch
      onSearch={getOptionListDebouce}
      defaultActiveFirstOption={false}
      filterOption={false}
      disabled={disabled || false}
      placeholder={placeholder}
      // value={selectedValue}
      onChange={getCurrentSelectInfo}
      allowClear={true}
      notFoundContent={fetching ? <Spin size="small" /> : null}
    >
      {options}
    </Select>
  );
}
