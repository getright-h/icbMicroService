import * as React from 'react';
import { Cascader } from 'antd';
import { useIAreaCascaderStore } from './i-area-cascader.component.store';
import { IIAreaCascaderProps } from './i-area-cascader.interface';

export default function IAreaCascaderComponent(props: IIAreaCascaderProps) {
  const { state, loadAreaData, onChangeArea } = useIAreaCascaderStore(props);

  return (
    <Cascader
      defaultValue={props.defaultValue}
      value={state.value}
      style={{ width: '100%' }}
      options={state.areaOptions}
      loadData={loadAreaData}
      onChange={onChangeArea}
      changeOnSelect
    />
  );
}
