import * as React from 'react';
import style from './select-address.component.less';
import { Select } from 'antd';
import { useSelectAddressStore } from './select-address.component.store';
import { ADDRESSINFO, ISelectAddressProps } from './select-address.interface';
const { Option } = Select;
const { map } = React.Children;
export default function SelectAddressComponent(props: ISelectAddressProps) {
  const { state, getAddressInfo } = useSelectAddressStore(props);
  const { city, province, district, citys, provinces, districts } = state;

  return (
    <div>
      <>
        <Select
          value={provinces && province}
          style={{ width: 100 }}
          placeholder="请输入省"
          allowClear
          onChange={adcode => getAddressInfo(ADDRESSINFO.CITY, adcode, ADDRESSINFO.PROVINCE)}
        >
          {provinces &&
            provinces.length &&
            provinces.map(item => (
              <Option key={item.adcode} value={item.adcode}>
                {item.name}
              </Option>
            ))}
        </Select>
        <Select
          style={{ width: 100 }}
          placeholder="请输入市"
          allowClear
          value={citys && city}
          onChange={adcode => getAddressInfo(ADDRESSINFO.AREA, adcode, ADDRESSINFO.CITY)}
        >
          {citys &&
            citys.length &&
            citys.map(item => (
              <Option key={item.adcode} value={item.adcode}>
                {item.name}
              </Option>
            ))}
        </Select>
        <Select
          style={{ width: 100 }}
          placeholder="请输入区"
          allowClear
          value={districts && districts.length ? district : undefined}
          onChange={adcode => getAddressInfo(undefined, adcode, ADDRESSINFO.AREA)}
        >
          {districts &&
            districts.length &&
            districts.map(item => (
              <Option key={item.adcode} value={item.adcode}>
                {item.name}
              </Option>
            ))}
        </Select>
      </>
    </div>
  );
}
