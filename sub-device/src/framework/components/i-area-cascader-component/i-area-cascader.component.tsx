import * as React from 'react';
import style from './i-area-cascader.component.less';
import { Cascader } from 'antd';
import { useIAreaCascaderStore } from './i-area-cascader.component.store';
import { IIAreaCascaderProps } from './i-area-cascader.interface';

export default function IAreaCascaderComponent(props: IIAreaCascaderProps) {
  const { state, loadAreaData, onChangeArea } = useIAreaCascaderStore(props);

  return (
    <Cascader
      defaultValue={props.defaultValue}
      value={state.value}
      options={state.areaOptions}
      loadData={loadAreaData}
      onChange={onChangeArea}
      changeOnSelect
    />
  );
}
