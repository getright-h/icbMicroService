import * as React from 'react';
import { IOwnerManageState, ModalType } from './owner-manage.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect } from 'react';
import { ShowNotification } from '~/framework/util/common';
import { CustomerManageService } from '~/solution/model/services/customer-manage.service';
import { Form, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useAuthorityState } from '~/framework/aop/hooks/use-authority-state';

export function useOwnerManageStore() {
  const { state, setStateWrap, getState } = useStateStore(new IOwnerManageState());
  const customerManageService: CustomerManageService = new CustomerManageService();
  const { $auth } = useAuthorityState();
  const [searchForm] = Form.useForm();

  useEffect(() => {
    initSearchForm();
  }, []);

  function getTableData() {
    setStateWrap({ isLoading: true });
    const { pageIndex, pageSize } = getState();
    customerManageService
      .queryOwnerPagedList({
        ...searchForm.getFieldsValue(),
        index: pageIndex,
        size: pageSize
      })
      .subscribe(
        res => {
          setStateWrap({ tableData: res.dataList, total: res.total, isLoading: false });
        },
        err => {
          setStateWrap({ isLoading: false });
        }
      );
  }

  function searchClick() {
    setStateWrap({ pageIndex: 1 });
    getTableData();
  }

  function initSearchForm() {
    searchForm.resetFields();
    searchForm.setFieldsValue({
      sex: -1,
      follow: -1
    });
    searchClick();
  }

  function callbackAction(actionType: number, data?: any) {
    setStateWrap({ currentId: data ? data.id : '' });
    switch (actionType) {
      case ModalType.CREATE:
        setStateWrap({ editVisible: true });
        break;
      case ModalType.EDIT:
        setStateWrap({ editVisible: true });
        break;
      case ModalType.DETAIL:
        setStateWrap({ detailVisible: true });
        break;
      case ModalType.DELETE:
        Modal.confirm({
          title: '??????????????????????????????',
          centered: true,
          icon: <ExclamationCircleOutlined />,
          onOk: () =>
            new Promise((resolve, reject) => {
              customerManageService.deleteOwner(data.id).subscribe(
                (res: any) => {
                  ShowNotification.success('????????????');
                  searchClick();
                  resolve();
                },
                (err: any) => {
                  reject();
                }
              );
            })
        });
        break;
      default:
        break;
    }
  }

  function changeTablePageIndex(pageIndex: number, pageSize: number) {
    setStateWrap({ pageIndex, pageSize });
    getTableData();
  }

  function handleModalCancel(isSuccess = false) {
    setStateWrap({ editVisible: false, detailVisible: false });
    isSuccess && searchClick();
  }
  function onSelectRows(selectedRowKeys: any) {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
  }
  return {
    state,
    searchForm,
    $auth,
    initSearchForm,
    callbackAction,
    changeTablePageIndex,
    searchClick,
    handleModalCancel,
    onSelectRows
  };
}
