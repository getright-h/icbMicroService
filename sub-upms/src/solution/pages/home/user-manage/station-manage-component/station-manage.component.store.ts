import { IStationManageState } from './station-manage.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { Subscription } from 'rxjs';
import { useEffect } from 'react';

export function useStationManageStore() {
  const { state, setStateWrap } = useStateStore(new IStationManageState());
  let getTableDataSubscription: Subscription;

  function getTableData() {
    let { tableData } = state;
    tableData = [
      {
        id: '327',
        distributor: 'YDSK'
      }
    ];
    setStateWrap({ tableData });
  }
  function changeTablePageIndex(index: number, pageSize: number) {
    const { searchForm } = state;
    searchForm.index = index;
    if (pageSize !== searchForm.size) {
      searchForm.index = 1;
      searchForm.size = pageSize;
    }
    setStateWrap({ searchForm });
    getTableData();
  }
  useEffect(() => {
    getTableData();
    return () => {
      getTableDataSubscription && getTableDataSubscription.unsubscribe();
    };
  }, []);
  return { state, changeTablePageIndex };
}
