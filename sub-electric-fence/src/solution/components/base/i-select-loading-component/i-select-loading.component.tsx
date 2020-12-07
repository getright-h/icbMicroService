import * as React from 'react';
import { Select } from 'antd';
import { IISelectLoadingProps } from './i-select-loading.interface';
import { useISelectLoadingStore } from './i-select-loading.component.store';

export default function ISelectLoadingComponent(props: IISelectLoadingProps) {
  const {
    placeholder,
    disabled,
    getCurrentSelectInfo,
    width = '100%',
    reqUrl,
    allowClear = true,
    mode,
    showSearch = true,
    labelInValue
  } = props;
  const { state, optionScroll, fetchOptions } = useISelectLoadingStore(props);
  const { optionList, fetching } = state;
  return (
    <Select
      style={{ width }}
      labelInValue={labelInValue}
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
      showSearch={showSearch}
      onSearch={$event => fetchOptions(true, $event)}
      allowClear={allowClear}
      dropdownMatchSelectWidth={props.dropdownMatchSelectWidth ?? true}
    >
      {optionList &&
        optionList.map((item: any, index: number) => {
          if (reqUrl === 'queryDeviceList') {
            return (
              <Select.Option value={item.code} key={`${item.code}${item.sim}`} info={item}>
                {`${item.code}（${item.typeName}）`}
              </Select.Option>
            );
          } else if (reqUrl === 'queryStoreList') {
            return (
              <Select.Option value={item.id} key={item.id} info={item}>
                {`${item.name}（${item.organizationName}）`}
              </Select.Option>
            );
          } else if (reqUrl === 'queryVehicleList') {
            return (
              <Select.Option value={item.vinNo} key={item.id} info={item}>
                {item.vinNo}
              </Select.Option>
            );
          } else if (reqUrl === 'getTypesList') {
            return (
              <Select.Option value={item.id} key={item.id} info={item}>
                {item.cmdName}
              </Select.Option>
            );
          } else if (reqUrl === 'queryVehicleInfoPagedList') {
            return (
              <Select.Option value={item.id} key={item.id} info={item}>
                {`${item.ownerName}（${item.plateNo}）`}
              </Select.Option>
            );
          } else {
            return (
              <Select.Option value={item.id} key={item.id} info={item}>
                {item.telephone ? item.name + ' ' + item.telephone : item.name}
              </Select.Option>
            );
          }
        })}
    </Select>
  );
}
