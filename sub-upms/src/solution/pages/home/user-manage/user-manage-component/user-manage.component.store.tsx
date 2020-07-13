import { IUserManageState } from './user-manage.interface';
import { useStateStore, useService } from '~/framework/aop/hooks/use-base-store';
import { Subscription } from 'rxjs';
import { UserManageService } from '~/solution/model/services/user-manage.service';
import React, { useEffect } from 'react';
import { ShowNotification } from '~/framework/util/common';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

export function useUserManageStore() {
  const { state, setStateWrap, getState } = useStateStore(new IUserManageState());
  const userManageService: UserManageService = useService(UserManageService);
  let getTableDataSubscription: Subscription;

  function getSelectTreeNode(node: Record<string, any>) {
    const searchForm = {
      systemId: process.env.SYSTEM_ID,
      name: '',
      telephone: '',
      organizationCode: '',
      departmentCode: '',
      positionCode: '',
      typeId: '',
      index: 1,
      size: 10
    };
    switch (node.hierarchyType) {
      case 0:
        searchForm.organizationCode = node.code;
        break;
      case 1:
        searchForm.departmentCode = node.code;
        break;
      case 2:
        searchForm.positionCode = node.code;
        break;
      default:
        searchForm.typeId = node.id;
        break;
    }
    searchForm.systemId = node.systemId;
    setStateWrap({ searchForm });
    getTableData();
  }

  function getTableData(isClick?: boolean) {
    const { searchForm } = getState();
    isClick && (searchForm.index = 1);
    setStateWrap({ searchForm });
    getTableDataSubscription = userManageService.queryUserList(searchForm).subscribe(
      (res: any) => {
        setStateWrap({ tableData: res.dataList, total: res.total });
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
  function addUser() {
    setStateWrap({ popVisible: true, isEdit: false, isDetail: false, userId: '' });
  }
  function tableAction(actionName: string, row: any) {
    console.log(row);
    switch (actionName) {
      case '详情':
        setStateWrap({ popVisible: true, isEdit: true, isDetail: true, userId: row.id });
        break;
      case '编辑':
        setStateWrap({ popVisible: true, isEdit: true, isDetail: false, userId: row.id });
        break;
      case '权限':
        break;
      case '删除':
        Modal.confirm({
          title: '确定删除此用户吗？',
          icon: <ExclamationCircleOutlined />,
          onOk: () =>
            new Promise((resolve, reject) => {
              userManageService.deleteUser(row.id).subscribe(
                (res: any) => {
                  ShowNotification.success('已删除！');
                  getTableData(true);
                  resolve();
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
  function popClose(isSuccess?: boolean) {
    setStateWrap({ popVisible: false });
    if (isSuccess) {
      getTableData(true);
    }
  }
  useEffect(() => {
    getTableData();
    return () => {
      getTableDataSubscription && getTableDataSubscription.unsubscribe();
    };
  }, []);
  return {
    state,
    getTableData,
    changeTablePageIndex,
    tableAction,
    getSelectTreeNode,
    handleFormDataChange,
    addUser,
    popClose
  };
}
