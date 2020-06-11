import { IOrganizationManageState } from './organization-manage.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { Subscription } from 'rxjs';
import { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

export function useOrganizationManageStore() {
  const { state, setStateWrap } = useStateStore(new IOrganizationManageState());
  let getTableDataSubscription: Subscription;

  function getTableData() {
    let { tableData } = state;
    tableData = [
      {
        id: '327',
        name: 'YDSK'
      }
    ];
    setStateWrap({ tableData });
  }
  function addButtonClick(props: RouteComponentProps) {
    props.history.push('/account/organizationManage/addOrganization');
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
  return { state, changeTablePageIndex, addButtonClick };
}
