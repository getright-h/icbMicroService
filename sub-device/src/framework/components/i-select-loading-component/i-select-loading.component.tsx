import * as React from 'react';
import { Select } from 'antd';
import { IISelectLoadingProps } from './i-select-loading.interface';
import { useISelectLoadingStore } from './i-select-loading.component.store';

export default function ISelectLoadingComponent(props: IISelectLoadingProps) {
  const { placeholder, disabled, getCurrentSelectInfo, width = '100%', reqUrl } = props;
  const { state, optionScroll, fetchOptions } = useISelectLoadingStore(props);
  const { optionList, fetching } = state;
  return (
    <Select
      style={{ width }}
      loading={fetching}
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
      allowClear={true}
      dropdownMatchSelectWidth={props.dropdownMatchSelectWidth ?? true}
    >
      {optionList &&
        optionList.map((item: any, index: number) => {
          if (reqUrl === 'queryDeviceList') {
            return (
              <Select.Option value={item.code} key={`${item.code}${item.sim}`} info={item}>
                {item.code}
              </Select.Option>
            );
          } else if (reqUrl === 'queryStoreList') {
            return (
              <Select.Option value={item.id} key={`${item.id}${item.index}`} info={item}>
                {`${item.name}（${item.organizationName}）`}
              </Select.Option>
            );
          } else {
            return (
              <Select.Option value={item.id} key={`${item.id}${index}`} info={item}>
                {item.telephone ? item.name + ' ' + item.telephone : item.name}
              </Select.Option>
            );
          }
        })}
    </Select>
  );
}
