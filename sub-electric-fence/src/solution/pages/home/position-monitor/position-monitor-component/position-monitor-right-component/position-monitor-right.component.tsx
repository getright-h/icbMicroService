import * as React from 'react';
import style from './position-monitor-right.component.less';
import { usePositionMonitorRightStore } from './position-monitor-right.component.store';
import { ISelectLoadingComponent } from '~/solution/components/component.module';
import { Select, Space } from 'antd';
const { Option } = Select;
export default function PositionMonitorRightComponent() {
  const { state, handleChangeCircleFunction, handleCircleLocation, startRule } = usePositionMonitorRightStore();
  const { locationList, isRule } = state;
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
  function SearchAddress() {
    return (
      <Select
        showSearch
        placeholder="请输入地址"
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
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

  function RenderMap() {
    return (
      <div id="container" style={{ height: '75vh' }}>
        <button className={`${style.info} ${style.floatRight}`} onClick={startRule}>
          {isRule ? '关闭' : '测距'}
        </button>
      </div>
    );
  }

  return (
    <div className={style.positionMonitorRight}>
      <div className={style.positionRightSearch}>
        <div>
          <span>搜索车辆: </span>
          {ISelectCarLoadingComponent()}
        </div>
        <Space />
        <div style={{ paddingLeft: '15px' }}>
          <span>搜索地址: </span>
          {SearchAddress()}
        </div>
      </div>
      <div className={style.positionRightMap}>{RenderMap()}</div>
    </div>
  );
}
