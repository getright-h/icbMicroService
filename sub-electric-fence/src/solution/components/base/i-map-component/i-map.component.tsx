import { Select } from 'antd';
import * as React from 'react';
import style from './i-map.component.less';
import { useIMapStore } from './i-map.component.store';
import { ISelectLoadingComponent } from '~/solution/components/component.module';
import { TIMapProps } from './i-map.interface';
const { Option } = Select;
export default function IMapComponent(mapProps: TIMapProps) {
  const { state, startRule, startDrawRactangle, handleChangeCircleFunction, handleCircleLocation } = useIMapStore(
    mapProps
  );
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

  const ISelectCarLoadingComponent = React.useCallback(
    () =>
      ISelectLoadingComponent({
        placeholder: '车主姓名/手机/车牌号',
        showSearch: true,
        width: '200px',
        isData: true,
        allowClear: false,
        reqUrl: 'queryStoreListByOrganizationId'
        // getCurrentSelectInfo: (...info) => getCurrentSelectInfo(field, ...info, 'store')
      }),
    []
  );
  return (
    <div id="container" style={{ height: '80vh' }}>
      <div className={`${style.info} ${style.floatRight}`}>
        <button onClick={startRule}>测距</button>
        <button onClick={startDrawRactangle}>区域查车</button>
      </div>
      <div className={`${style.info} ${style.searchAddress}`}>{SearchAddress()}</div>
      <div className={`${style.info} ${style.searchCar}`}>{ISelectCarLoadingComponent()}</div>
    </div>
  );
}
