import * as React from 'react';
import style from './i-drap-choose.component.less';
import { Select } from 'antd';
import { useIDrapChooseStore } from './i-drap-choose.component.store';
import { IIDrapChooseState } from './i-drap-choose.interface';
const { Option } = Select
export default function IDrapChooseComponent() {
  const { state } = useIDrapChooseStore();
  return (
    <Select>
      <Option value={'1'}></Option>
      <Option value={'1'}></Option>
    </Select>
  )
}
