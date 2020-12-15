import { IDepartmentManageState } from './department-manage.interface';
import { useStateStore, useService } from '~/framework/aop/hooks/use-base-store';
import { Subscription } from 'rxjs';
import React, { useEffect, useContext } from 'react';
import { DepartmentManageService } from '~/solution/model/services/department-manage.service';
import { ShowNotification } from '~/framework/util/common';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { IGlobalState } from '~/solution/context/global/global.interface';
import { GlobalContext } from '~/solution/context/global/global.provider';

export function useDepartmentManageStore() {
  const { gState }: IGlobalState = useContext(GlobalContext);
  const { state, setStateWrap } = useStateStore(new IDepartmentManageState());
  const departmentManageService = useService(DepartmentManageService);
  let getTableDataSubscription: Subscription;

  function getTableData(isClick?: boolean) {
    const { searchForm } = state;
    isClick && (searchForm.index = 1);
    setStateWrap({ searchForm });
    getTableDataSubscription = departmentManageService
      .queryDepartmentList({ systemId: gState.myInfo.systemId, ...searchForm })
      .subscribe(
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
    searchForm.index = index;
    if (pageSize !== searchForm.size) {
      searchForm.index = 1;
      searchForm.size = pageSize;
    }
    setStateWrap({ searchForm });
    getTableData();
  }
  function tableAction(actionName: string, row: any) {
    switch (actionName) {
      case '编辑':
        setStateWrap({
          editDepartmentVisible: true,
          isEdit: true,
          editDepartmentInfo: row
        });
        break;
      case '删除':
        Modal.confirm({
          title: '确定删除此部门吗？',
          icon: <ExclamationCircleOutlined />,
          onOk: () =>
            new Promise((resolve, reject) => {
              departmentManageService.deleteDepartment(row.id).subscribe(
                (res: any) => {
                  ShowNotification.success('已删除！');
                  getTableData(true);
                  resolve(true);
                },
                (err: any) => {
                  ShowNotification.error(err);
                  reject();
                }
              );
            })
        });
        break;
    }
  }
  function handleFormDataChange(value: string | number, type: string, option?: Record<string, any>) {
    const { searchForm } = state;
    switch (type) {
      case 'code':
        searchForm.code = value ? option.info.code : '';
        break;
      default:
        searchForm[type] = value;
        break;
    }
    setStateWrap({ searchForm });
  }
  function addDepartment() {
    setStateWrap({ editDepartmentVisible: true, isEdit: false });
  }
  function popclose() {
    setStateWrap({ editDepartmentVisible: false });
    getTableData(true);
  }
  useEffect(() => {
    gState.myInfo.systemId && getTableData();
    return () => {
      getTableDataSubscription && getTableDataSubscription.unsubscribe();
    };
  }, []);
  return { state, getTableData, changeTablePageIndex, tableAction, handleFormDataChange, addDepartment, popclose };
}
