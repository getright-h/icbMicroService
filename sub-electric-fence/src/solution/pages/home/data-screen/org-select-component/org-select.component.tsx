import * as React from 'react';
import style from './org-select.component.less';
import { useOrgSelectStore } from './org-select.component.store';
import Select, { Option } from 'rc-select';
import { IOrgSelectProps } from './org-select.interface';

export default function OrgSelectComponent(props: IOrgSelectProps) {
  const { state, debounceFnSearch, focusSearch, onChange } = useOrgSelectStore(props);
  const { orgList, loading, curValue } = state;
  return (
    <Select
      allowClear
      placeholder="请选择机构"
      notFoundContent="暂无数据"
      animation="slide-up"
      loading={loading}
      showSearch
      prefixCls="custom-select"
      filterOption={false}
      onChange={onChange}
      onSearch={value => debounceFnSearch(value)}
      onFocus={focusSearch}
      value={curValue}
      dropdownStyle={props.dropdownStyle}
    >
      {orgList.map((item: { [x: string]: any }) => {
        return (
          <Option key={item.id} value={item.value}>
            {item.name}
          </Option>
        );
      })}
    </Select>
  );
}
