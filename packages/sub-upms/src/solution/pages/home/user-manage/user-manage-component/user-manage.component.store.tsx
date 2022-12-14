import { IUserManageState } from './user-manage.interface';
import { useStateStore, useService } from '~/framework/aop/hooks/use-base-store';
import { Subscription } from 'rxjs';
import { UserManageService } from '~/solution/model/services/user-manage.service';
import React, { useEffect, useContext, useRef } from 'react';
import { ShowNotification } from '~/framework/util/common';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { IGlobalState } from '~/solution/context/global/global.interface';
import { GlobalContext } from '~/solution/context/global/global.provider';

export function useUserManageStore() {
  const { gState }: IGlobalState = useContext(GlobalContext);
  const { state, setStateWrap, getState } = useStateStore(new IUserManageState());
  const userManageService: UserManageService = useService(UserManageService);
  let getTableDataSubscription: Subscription;

  const systemId = useRef('');

  function getSelectTreeNode(node: Record<string, any>) {
    const searchForm = {
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
    systemId.current = node.systemId;
    setStateWrap({ searchForm });
    getTableData();
  }

  function getTableData(isClick?: boolean) {
    const { searchForm } = getState();
    isClick && (searchForm.index = 1);
    setStateWrap({ isLoading: true });
    getTableDataSubscription = userManageService.queryUserList({ systemId: systemId.current, ...searchForm }).subscribe(
      (res: any) => {
        setStateWrap({ tableData: res.dataList, total: res.total, isLoading: false });
      },
      (err: any) => {
        ShowNotification.error(err);
        setStateWrap({ isLoading: false });
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
    switch (actionName) {
      case '??????':
        setStateWrap({ popVisible: true, isEdit: true, isDetail: true, userId: row.id });
        break;
      case '??????':
        setStateWrap({ popVisible: true, isEdit: true, isDetail: false, userId: row.id });
        break;
      case '????????????':
        setStateWrap({ passwordVisible: true, userId: row.id });
        break;
      case '????????????':
        Modal.confirm({
          title: '????????????????????????????????????',
          icon: <ExclamationCircleOutlined />,
          onOk: () =>
            new Promise((resolve, reject) => {
              userManageService.resetPassword(row.id).subscribe(
                (res: any) => {
                  Modal.success({
                    content: `??????????????????${res}`
                  });
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
      case '??????':
        Modal.confirm({
          title: '???????????????????????????',
          icon: <ExclamationCircleOutlined />,
          onOk: () =>
            new Promise((resolve, reject) => {
              userManageService.deleteUser(row.id).subscribe(
                (res: any) => {
                  ShowNotification.success('????????????');
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
  function popClose(isSuccess?: boolean) {
    setStateWrap({ popVisible: false, passwordVisible: false });
    if (isSuccess) {
      getTableData(true);
    }
  }
  useEffect(() => {
    if (gState.myInfo.systemId) {
      systemId.current = gState.myInfo.systemId;
      getTableData();
    }
    return () => {
      getTableDataSubscription && getTableDataSubscription.unsubscribe();
    };
  }, [gState.myInfo.systemId]);
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
