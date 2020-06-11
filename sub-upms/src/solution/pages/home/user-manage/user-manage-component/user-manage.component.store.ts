import { IUserManageState } from './user-manage.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { Subscription } from 'rxjs';
import { useEffect } from 'react';

export function useUserManageStore() {
  const { state, setStateWrap } = useStateStore(new IUserManageState());
  let getTableDataSubscription: Subscription;

  function getTableData() {
    let { tableData } = state;
    tableData = [
      {
        id: '327',
        contactName: 'YDSK'
      }
    ];
    setStateWrap({ tableData });
  }
  function changeTablePageIndex(index: number) {
    const { searchForm } = state;
    searchForm.index = index;
    setStateWrap({ searchForm });
  }
  useEffect(() => {
    getTableData();
    return () => {
      getTableDataSubscription && getTableDataSubscription.unsubscribe();
    };
  }, []);
  return { state, changeTablePageIndex };
}
