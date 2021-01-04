import * as React from 'react';
import { IVoucherManageState, ModalType } from './voucher-manage.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect } from 'react';
import { VoucherManageService } from '~/solution/model/services/voucher-manage.service';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { ShowNotification } from '~/framework/util/common';
moment.locale('zh-cn');

export function useVoucherManageStore() {
  const { state, setStateWrap, getState } = useStateStore(new IVoucherManageState());
  const voucherManageService: VoucherManageService = new VoucherManageService();

  useEffect(() => {
    getTableData();
  }, []);

  function getTableData() {
    setStateWrap({ isLoading: true });
    const { searchForm } = getState();
    voucherManageService
      .getDispatchPagedList({
        ...searchForm,
        beginTime: searchForm.beginTime
          ? moment(searchForm.beginTime)
              .startOf('d')
              .valueOf()
          : 0,
        endTime: searchForm.endTime
          ? moment(searchForm.endTime)
              .endOf('d')
              .valueOf()
          : 0
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

  function onChange(value: any, valueType: string) {
    setStateWrap({
      searchForm: {
        ...state.searchForm,
        [valueType]: value
      }
    });
  }

  function getDateTimeInfo(timeInfo: any) {
    setStateWrap({
      searchForm: {
        ...state.searchForm,
        beginTime: timeInfo[0],
        endTime: timeInfo[1]
      }
    });
  }

  function searchClick() {
    setStateWrap({
      searchForm: {
        ...state.searchForm,
        index: 1
      }
    });
    getTableData();
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
              voucherManageService.deleteDispatch(data.id).subscribe(
                (res: any) => {
                  ShowNotification.success('已删除！');
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

  function changeTablePageIndex(index: number, size: number) {
    setStateWrap({
      searchForm: {
        ...state.searchForm,
        index,
        size
      }
    });
    getTableData();
  }

  function handleModalCancel(isSuccess?: boolean) {
    setStateWrap({ editVisible: false, detailVisible: false });
    isSuccess && searchClick();
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
