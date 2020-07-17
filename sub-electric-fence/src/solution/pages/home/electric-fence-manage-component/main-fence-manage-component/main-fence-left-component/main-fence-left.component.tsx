import * as React from 'react';
import style from './main-fence-left.component.less';
import { ITableComponent, TablePageTelComponent } from '~/solution/components/component.module';
import { useMainFenceLeftStore } from './main-fence-left.component.store';
import { stationColumns } from './main-fence-left-component.column';
import { Button, Input } from 'antd';
import { IMainFenceLeftProps } from './main-fence-left.interface';

function MainFenceLeftComponent(props: IMainFenceLeftProps, ref: any) {
  const { state, callbackAction, changeTablePageIndex, rowClick, searchClick, onValueChange } = useMainFenceLeftStore(
    props
  );
  const { isLoading, tableData, searchForm, total } = state;
  React.useImperativeHandle(ref, () => ({
    searchClick,
    onValueChange
  }));
  return (
    <div className={style.test}>
      <ITableComponent
        columns={stationColumns(callbackAction)}
        isLoading={isLoading}
        rowClick={rowClick}
        pageIndex={searchForm.index}
        pageSize={searchForm.size}
        data={tableData}
        total={total}
        isPagination={true}
        changeTablePageIndex={(index: number) => changeTablePageIndex(index)}
      ></ITableComponent>
    </div>
  );
}

export default React.forwardRef(MainFenceLeftComponent);
