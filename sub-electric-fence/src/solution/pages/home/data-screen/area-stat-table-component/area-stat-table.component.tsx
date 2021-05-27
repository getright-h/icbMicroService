import * as React from 'react';
import style from './area-stat-table.component.less';
import { useAreaStatTableStore } from './area-stat-table.component.store';
import Table from 'rc-table';
import { areaStatColumns, tempData1 } from './area-stat.column';

export default function AreaStatTableComponent() {
  const { state } = useAreaStatTableStore();
  return <Table columns={areaStatColumns} data={tempData1} prefixCls={style.areaTable} />;
}
