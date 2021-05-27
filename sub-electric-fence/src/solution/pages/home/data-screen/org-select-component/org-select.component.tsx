import * as React from 'react';
import style from './org-select.component.less';
import { useOrgSelectStore } from './org-select.component.store';
import Select, { Option } from 'rc-select';

export default function OrgSelectComponent() {
  const { state } = useOrgSelectStore();
  return (
    <Select
      allowClear
      placeholder="请选择机构"
      animation="slide-up"
      showSearch
      prefixCls="custom-select"
      // onChange={onChange}
    >
      <Option value="jack">jack</Option>
      <Option value="lucy">lucy</Option>
      <Option value="yiminghe">yiminghe</Option>
    </Select>
  );
}
