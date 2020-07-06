import { IUserManageState } from './user-manage.interface';
import { useStateStore, useService } from '~/framework/aop/hooks/use-base-store';
import { Subscription } from 'rxjs';
import { UserManageService } from '~/solution/model/services/user-manage.service';
import { useEffect, useCallback } from 'react';
import { ShowNotification } from '~/framework/util/common';

export function useUserManageStore() {
  const { state, setStateWrap } = useStateStore(new IUserManageState());
  const userManageService = useService(UserManageService);
  let getTableDataSubscription: Subscription;

  const getSelectTreeNode = useCallback((node: Record<string, any>) => {
    console.log(node);
  }, []);

  function getTableData(isClick?: boolean) {
    const { searchForm } = state;
    isClick && (searchForm.index = 1);
    setStateWrap({ searchForm });
    getTableDataSubscription = userManageService.queryUserList(searchForm).subscribe(
      (res: any) => {
        setStateWrap({ tableData: res.dataList });
      },
      (err: any) => {
        ShowNotification.error(err);
      }
    );
  }
  function changeTablePageIndex(index: number, pageSize: number) {
    const { searchForm } = state;
    if (pageSize !== searchForm.size) {
      searchForm.index = 1;
      searchForm.size = pageSize;
    } else {
      searchForm.index = index;
    }
    setStateWrap({ searchForm });
    getTableData();
  }
  function handleFormDataChange($event: any, type: string) {
    const { searchForm } = state;
    if ($event.hasOwnProperty('target')) {
      searchForm[type] = $event.target.value;
    } else {
      searchForm[type] = $event;
    }
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
  return { state, getTableData, changeTablePageIndex, tableAction, getSelectTreeNode, handleFormDataChange };
}
