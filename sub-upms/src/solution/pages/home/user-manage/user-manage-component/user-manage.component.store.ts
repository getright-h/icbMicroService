import { IUserManageState } from './user-manage.interface';
import { useStateStore, useService } from '~/framework/aop/hooks/use-base-store';
import { Subscription } from 'rxjs';
import { UserManageService } from '~/solution/model/services/user-manage.service';
import { useEffect, useCallback } from 'react';

export function useUserManageStore() {
  const { state, setStateWrap } = useStateStore(new IUserManageState());
  const userManageService = useService(UserManageService);
  let getTableDataSubscription: Subscription;

  const getSelectTreeNode = useCallback((key: string) => {
    console.log(key);
  }, []);

  function getTableData() {
    getTableDataSubscription = userManageService
      .queryUserList({
        // systemId: '938880216d89c68eb6ea08d69b143c52',
        systemId: process.env.SYSTEM_ID,
        index: 1,
        size: 10
      })
      .subscribe((res: any) => {
        setStateWrap({ tableData: res.dataList });
      });
  }
  function changeTablePageIndex(index: number) {
    const { searchForm } = state;
    searchForm.index = index;
    setStateWrap({ searchForm });
  }
  function tableAction(actionName: string, row: any) {
    console.log(row);
    switch (actionName) {
      case '权限':
        break;
      case '删除':
        break;
    }
  }
  useEffect(() => {
    getTableData();
    return () => {
      getTableDataSubscription && getTableDataSubscription.unsubscribe();
    };
  }, []);
  return { state, changeTablePageIndex, tableAction, getSelectTreeNode };
}
