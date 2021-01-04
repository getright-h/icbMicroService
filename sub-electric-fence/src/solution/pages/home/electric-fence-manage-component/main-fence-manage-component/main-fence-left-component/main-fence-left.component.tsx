import React from 'react';
import style from './main-fence-left.component.less';
import { ITableComponent } from '~/solution/components/component.module';
import { useMainFenceLeftStore } from './main-fence-left.component.store';
import { stationColumns } from './main-fence-left-component.column';
import { rowClickAction } from '../hooks-redux/main-fence-action';
import { IMainFenceLeftProps } from './main-fence-left.interface';
import { MainFenceManageContext } from '../main-fence-manage.provider';

function MainFenceLeftComponent(props: IMainFenceLeftProps, ref: any) {
  const { state, callbackAction, changeTablePageIndex } = useMainFenceLeftStore(props);
  const { mainFenceManageState, dispatch } = React.useContext(MainFenceManageContext);
  const { isLoading, total, tableData, searchForm } = mainFenceManageState;

  return (
    <div className={style.test}>
      <ITableComponent
        columns={stationColumns(callbackAction)}
        isLoading={isLoading}
        rowClick={record => rowClickAction(record, dispatch)}
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
