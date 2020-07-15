import * as React from 'react';
import style from './select-address.component.less';
import { Select } from 'antd';
import { useSelectAddressStore } from './select-address.component.store';
import { ADDRESSINFO } from './select-address.interface';
const { Option } = Select;
export default function SelectAddressComponent() {
  const { state, getAddressInfo } = useSelectAddressStore();
  const { city, province, area } = state;
  return (
    <div>
      <>
        <Select
          defaultValue={province[0].adcode}
          style={{ width: 120 }}
          onChange={adcode => getAddressInfo(ADDRESSINFO.CITY, adcode)}
        >
          {province.map(item => (
            <Option key={item.adcode} value={item.adcode}>
              {item.name}
            </Option>
          ))}
        </Select>
        <Select
          style={{ width: 120 }}
          defaultValue={city[0].adcode}
          onChange={adcode => getAddressInfo(ADDRESSINFO.AREA, adcode)}
        >
          {city.map(item => (
            <Option key={item.adcode} value={item.adcode}>
              {item.name}
            </Option>
          ))}
        </Select>
        <Select
          style={{ width: 120 }}
          defaultValue={area[0].adcode}
          onChange={adcode => getAddressInfo(ADDRESSINFO.AREA, adcode)}
        >
          {area.map(item => (
            <Option key={item.adcode} value={item.adcode}>
              {item.name}
            </Option>
          ))}
        </Select>
      </>
    </div>
  );
}
