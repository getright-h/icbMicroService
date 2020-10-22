import * as React from 'react';
import { IOwnerManageState, ModalType } from './owner-manage.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect } from 'react';
import { ShowNotification } from '~/framework/util/common';
import { CustomerManageService } from '~/solution/model/services/customer-manage.service';
import { Form, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

export function useOwnerManageStore() {
  const { state, setStateWrap } = useStateStore(new IOwnerManageState());
  const customerManageService: CustomerManageService = new CustomerManageService();
  const [searchForm] = Form.useForm();

  useEffect(() => {
    getTableData();
  }, []);

  function getTableData() {
    // setStateWrap({ isLoading: true });
    // customerManageService.__getTableData__(state.searchForm).subscribe(
    //   res => {
    //     setStateWrap({ tableData: res.dataList, total: res.total, isLoading: false });
    //   },
    //   err => {
    //     setStateWrap({ isLoading: false });
    //     ShowNotification.error(err);
    //   }
    // );
    const tableData = [
      {
        id: '327',
        userName: 'JY',
        relateVehicle: '97855',
        vehicleInfo: {
          number: '97855',
          type: 'AAA'
        }
      }
    ];
    setStateWrap({ tableData });
  }

  function searchClick() {
    setStateWrap({ pageIndex: 1 });
    getTableData();
  }

  function initSearchForm() {
    searchForm.resetFields();
    searchForm.setFieldsValue({
      gender: -1,
      level: -1
    });
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
          title: '是否确认删除该车主？',
          icon: <ExclamationCircleOutlined />,
          onOk: () =>
            new Promise((resolve, reject) => {
              //   customerManageService.deleteOwner(data.id).subscribe(
              //     (res: any) => {
              //       ShowNotification.success('已删除！');
              //       getTableData();
              //       resolve();
              //     },
              //     (err: any) => {
              //       ShowNotification.error(err);
              //       reject();
              //     }
              //   );
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

  function handleModalCancel() {
    setStateWrap({ editVisible: false, detailVisible: false });
  }
  function openModal(type: ModalType) {
    switch (type) {
      case ModalType.CREATE:
        break;
      default:
        break;
    }
  }
  function onSelectRows(selectedRowKeys: any) {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
  }
  return {
    state,
    searchForm,
    initSearchForm,
    callbackAction,
    changeTablePageIndex,
    searchClick,
    handleModalCancel,
    openModal,
    onSelectRows
  };
}
