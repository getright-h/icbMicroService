import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { DrapChooseLoadingStore } from './drap-choose-loading.component.store';
import { IProps } from './drap-choose-loading.interface';
import { Select } from 'antd';
const { Option } = Select;

@inject('drapChooseLoadingStore')
@observer
export default class DrapChooseLoadingComponent extends React.Component<IProps> {
  private readonly store: DrapChooseLoadingStore = this.props.drapChooseLoadingStore;
  static defaultProps = {
    placeholder: '请选择经销商',
    reqUrl: 'manageList',
    seachKey: '',
    getCurrentSelectInfo: () => {}
  };

  componentDidMount() {
    const { reqUrl, seachKey } = this.props;
    [this.store.currentUrl, this.store.searchName] = [reqUrl, seachKey];
    this.store.getManageList();
  }

  setCheckNum = (value: string, option: any) => {
    this.props.getCurrentSelectInfo(option.props);
  };

  render() {
    const { placeholder, defaultValue } = this.props;
    const { fetchCompany, companyScroll, optiosnList, fetching } = this.store;
    return (
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder={placeholder}
        onSearch={fetchCompany}
        defaultValue={defaultValue}
        onChange={this.setCheckNum}
        onPopupScroll={companyScroll}
        loading={fetching}
        allowClear={true}
      >
        {optiosnList &&
          optiosnList.map(item => (
            <Option value={item.name} key={item.id}>
              {item.name}
            </Option>
          ))}
      </Select>
    );
  }
}
