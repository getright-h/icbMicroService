import { IOrganizationManageState } from './organization-manage.interface';
import { useStateStore, useService } from '~/framework/aop/hooks/use-base-store';
import { Subscription } from 'rxjs';
import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { OrganizationManageService } from '~/solution/model/services/organization-manage.service';

export function useOrganizationManageStore() {
  const { state, setStateWrap } = useStateStore(new IOrganizationManageState());
  const organizationManageService = useService(OrganizationManageService);
  let getTableDataSubscription: Subscription;
  let getTreeDataSubscription: Subscription;

  function getTableData(isClick?: boolean) {
    const { searchForm } = state;
    isClick && (searchForm.index = 1);
    setStateWrap({ isLoading: true, searchForm });
    getTableDataSubscription = organizationManageService.queryOrganizationList(searchForm).subscribe(
      (res: any) => {
        setStateWrap({ tableData: res.dataList, isLoading: false });
      },
      (err: any) => {
        setStateWrap({ tableData: [], isLoading: false });
      }
    );
  }
  function addButtonClick(props: RouteComponentProps) {
    props.history.push('/account/organizationManage/addOrganization');
  }
  function handleFormDataChange($event: any, name: string) {
    const { searchForm } = state;
    if ($event.hasOwnProperty('target')) {
      searchForm[name] = $event.target.value;
    } else {
      searchForm[name] = $event;
    }
    setStateWrap({ searchForm });
  }
  function tableAction(row: any) {
    console.log('action', row);
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
  useEffect(() => {
    getTableData();
    return () => {
      getTableDataSubscription && getTableDataSubscription.unsubscribe();
      getTreeDataSubscription && getTreeDataSubscription.unsubscribe();
    };
  }, []);
  return { state, changeTablePageIndex, addButtonClick, tableAction, handleFormDataChange, getTableData };
}
