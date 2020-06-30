import * as React from 'react';
import style from './main-fence-left.component.less';
import { ITableComponent, TablePageTelComponent } from '~/solution/components/component.module';
import { useMainFenceLeftStore } from './main-fence-left.component.store';
import { stationColumns } from './main-fence-left-component.column';
import { Button, Input } from 'antd';

export default function MainFenceLeftComponent() {
  const { state, callbackAction, changeTablePageIndex, searchClick } = useMainFenceLeftStore();
  const { isLoading, searchForm, tableData, total, searchLoading } = state;
  return (
    <div className={style.test}>
      <ITableComponent
        columns={stationColumns(callbackAction)}
        isLoading={isLoading}
        pageIndex={searchForm.index}
        pageSize={searchForm.size}
        data={tableData}
        total={total}
        isPagination={true}
        changeTablePageIndex={(index: number, pageSize: number) => changeTablePageIndex(index, pageSize)}
      ></ITableComponent>
    </div>
  );
}
