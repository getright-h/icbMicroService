import { Select, Button } from 'antd';
import * as React from 'react';
import style from './i-map.component.less';
import { useIMapStore } from './i-map.component.store';
import { TIMapProps } from './i-map.interface';
const { Option } = Select;
export const IMapComponent = React.memo((mapProps: TIMapProps) => {
  const { needSearchAddress = true, height = '80vh', needRule = true, needRunDrivingLine = true } = mapProps;
  const { state, startRule, handleChangeCircleFunction, handleCircleLocation } = useIMapStore(mapProps);

  const { locationList, currentChooseLocation } = state;
  function SearchAddress() {
    return (
      <Select
        showSearch
        placeholder="输入地址定位"
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        allowClear
        value={currentChooseLocation}
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
      {needRule && (
        <div className={`${style.info} ${style.floatRight}`}>
          <Button type="primary" size="small" onClick={startRule}>
            测距
          </Button>
        </div>
      )}
      {needSearchAddress && <div className={`${style.info} ${style.searchAddress}`}>{SearchAddress()}</div>}
    </div>
  );
});
