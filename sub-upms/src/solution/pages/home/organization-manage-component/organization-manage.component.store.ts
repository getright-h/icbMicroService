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
      },
      {
        id: '777',
        name: 'XXXXX'
      }
    ];
    setStateWrap({ tableData });
  }
  function addButtonClick(props: RouteComponentProps) {
    props.history.push('/account/organizationManage/addOrganization');
  }
  function tableAction(actionName: string, row: any) {
    let props: RouteComponentProps;
    switch (actionName) {
      case '详情':
        props.history.push(`/account/organizationManage/organizationDetail/${row.id}`);
        break;

      default:
        break;
    }
  }

  function getSelectTreeNode(key: string) {
    // 获取当前所选node的相关信息
    console.log('点击的key', key);
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
  return { state, changeTablePageIndex, getSelectTreeNode, addButtonClick, tableAction };
}
