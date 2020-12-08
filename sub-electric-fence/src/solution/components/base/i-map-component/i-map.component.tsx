import { Select } from 'antd';
import * as React from 'react';
import style from './i-map.component.less';
import { useIMapStore } from './i-map.component.store';
import { TIMapProps } from './i-map.interface';
const { Option } = Select;
export const IMapComponent = React.memo((mapProps: TIMapProps) => {
  const { state, startRule, startDrawRactangle, handleChangeCircleFunction, handleCircleLocation } = useIMapStore(
    mapProps
  );
  const { needSearchAddress = true, needDrawRactangle, height = '80vh' } = mapProps;
  const { locationList } = state;
  function SearchAddress() {
    return (
      <Select
        showSearch
        placeholder="输入地址定位"
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        allowClear
        onSearch={handleChangeCircleFunction}
        onChange={handleCircleLocation}
        notFoundContent={null}
        style={{ width: '200px' }}
      >
        {locationList &&
          locationList.map(
            (d: any) =>
              d.location && (
                <Option key={d.adcode} value={JSON.stringify(d.location)}>
                  {d.name}
                </Option>
              )
          )}
      </Select>
    );
  }

  return (
    <div id={mapProps.id} style={{ height }}>
      <div className={`${style.info} ${style.floatRight}`}>
        <button onClick={startRule}>测距</button>
        {needDrawRactangle && <button onClick={startDrawRactangle}>区域查车</button>}
      </div>
      {needSearchAddress && <div className={`${style.info} ${style.searchAddress}`}>{SearchAddress()}</div>}
    </div>
  );
});
