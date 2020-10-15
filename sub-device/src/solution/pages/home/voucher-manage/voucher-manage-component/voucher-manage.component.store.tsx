import * as React from 'react';
import { IVoucherManageState, ModalType } from './voucher-manage.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect } from 'react';
import { VoucherManageService } from '~/solution/model/services/voucher-manage.service';
import { ShowNotification } from '~/framework/util/common';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';

export function useVoucherManageStore() {
  const { state, setStateWrap } = useStateStore(new IVoucherManageState());
  const voucherManageService: VoucherManageService = new VoucherManageService();

  useEffect(() => {
    getTableData();
  }, []);

  function getTableData() {
    // setStateWrap({ isLoading: true });
    // voucherManageService.__getTableData__(state.searchForm).subscribe(
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
        vehicleFrameNumber: 'XJQFZHSZD',
        deviceList: [
          { id: '1', name: 'XZX-330' },
          { id: '2', name: 'JY23333' }
        ]
      }
    ];
    setStateWrap({ tableData });
  }

  function onChange(value: any, valueType: string) {
    setStateWrap({
      searchForm: {
        ...state.searchForm,
        [valueType]: value
      }
    });
  }

  function getDateTimeInfo(timeInfo: any) {
    const { searchForm } = state;
    searchForm.beginTime = timeInfo[0];
    searchForm.endTime = timeInfo[1];
    setStateWrap({ searchForm });
  }

  function searchClick() {
    const { searchForm } = state;
    searchForm.page = 1;
    setStateWrap({ searchForm });
    getTableData();
    console.log(searchForm);
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
          title: '是否确认删除该安装单？',
          icon: <ExclamationCircleOutlined />,
          onOk: () =>
            new Promise((resolve, reject) => {
              // voucherManageService.deleteVoucher(data.id).subscribe(
              //   (res: any) => {
              //     ShowNotification.success('已删除！');
              //     getTableData();
              //     resolve();
              //   },
              //   (err: any) => {
              //     ShowNotification.error(err);
              //     reject();
              //   }
              // );
            })
        });
        break;
      default:
        break;
    }
  }

  function changeTablePageIndex(index: number, pageSize: number) {
    const { searchForm } = state;
    searchForm.page = index;
    searchForm.size = pageSize;
    setStateWrap({ searchForm });
    getTableData();
  }

  function handleModalCancel() {
    setStateWrap({ editVisible: false, detailVisible: false });
  }
  return {
    state,
    callbackAction,
    changeTablePageIndex,
    searchClick,
    handleModalCancel,
    getDateTimeInfo,
    onChange
  };
}
