import { Cascader } from 'antd';
import * as React from 'react';
import { useWarehouseCascaderStore } from './warehouse-cascader.component.store';
import { IWarehouseCascaderProps } from './warehouse-cascader.interface';

export default function WarehouseCascaderComponent(props: IWarehouseCascaderProps) {
  const { state, loadAreaData, onChange } = useWarehouseCascaderStore(props);
  return (
    <Cascader
      disabled={!props.organizationId}
      // value={state.value}s
      style={{ width: '100%' }}
      options={state.warehouseOptions}
      loadData={loadAreaData}
      onChange={onChange}
      // changeOnSelect
    />
  );
}
