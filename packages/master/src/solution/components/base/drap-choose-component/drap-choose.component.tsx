import * as React from 'react';
import { Select } from 'antd';
import { IDrapChooseProps } from './drap-choose.interface';
import { useDrapChooseStore } from './drap-choose.component.store';
const { Option } = Select;
DrapChooseComponent.defaultProps = {
  placeholder: '请选择经销商',
  reqUrl: 'getOrganizationPagedList',
  seachKey: '',
  type: '',
  showSearch: true,
  defaultValue: undefined,
  getCurrentSelectInfo: info => {}
};

export default function DrapChooseComponent(props: IDrapChooseProps) {
  const { companyScroll, fetchCompany, state } = useDrapChooseStore(props);

  function setCheckNum(value: string, option: any) {
    props.getCurrentSelectInfo(option ? option.props : { title: '', value: '' });
  }
  return (
    <Select
      disabled={props.isDisable}
      showSearch={props.showSearch}
      placeholder={props.placeholder}
      filterOption={false}
      onSearch={$event => fetchCompany(true, $event)}
      defaultValue={state.value}
      value={state.value}
      onChange={setCheckNum}
      onPopupScroll={companyScroll}
      loading={state.fetching}
      // onFocus={!state.optionList.length ? () => fetchCompany(false) : () => {}}
      onFocus={fetchCompany.bind(null, true)}
      allowClear={true}
    >
      {state.optionList.length &&
        state.optionList.map(item => (
          <Option value={item.id || item.cityCode} key={item.id || item.cityCode} title={item.name || item.cityName}>
            {/* 工单管理 ===> 转派 【要显示接单人的电话联系方式】 */}
            {props.placeholder === '请选择接单人'
              ? `${item.name}   ${item.telephone}`
              : `${item.name || item.cityName}`}
          </Option>
        ))}
    </Select>
  );
}
