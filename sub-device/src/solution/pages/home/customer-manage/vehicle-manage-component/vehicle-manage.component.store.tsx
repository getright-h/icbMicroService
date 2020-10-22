import * as React from 'react';
import { IVehicleManageState, ModalType } from './vehicle-manage.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect } from 'react';
import { ShowNotification } from '~/framework/util/common';
import { CustomerManageService } from '~/solution/model/services/customer-manage.service';
import { Form } from 'antd';
import { useHistory } from 'react-router-dom';

export function useVehicleManageStore() {
  const { state, setStateWrap } = useStateStore(new IVehicleManageState());
  const customerManageService: CustomerManageService = new CustomerManageService();
  const [searchForm] = Form.useForm();
  const history = useHistory();

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
        owner: 'JY',
        deviceList: [
          { id: '1', code: '0826', type: 'MHW-1' },
          { id: '1', code: '1013', type: 'FF-22' }
        ]
      }
    ];
    setStateWrap({ tableData });
  }

  function initSearchForm() {
    searchForm.resetFields();
  }

  function searchClick() {
    setStateWrap({ pageIndex: 1 });
    getTableData();
  }

  function callbackAction(actionType: number, data?: any) {
    setStateWrap({ currentId: data ? data.id : '' });
    switch (actionType) {
      case ModalType.CREATE:
        history.push('/home/customer/addVehicle');
        break;
      case ModalType.DETAIL:
        history.push(`/home/customer/vehicleDetail/${data.id}`);
        break;
      case ModalType.DELETE:
        break;
      case ModalType.UNBIND:
        setStateWrap({ isUnbindDevice: true });
        console.log('unbind', data);

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
    setStateWrap({ isUnbindDevice: false });
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
    onSelectRows
  };
}
