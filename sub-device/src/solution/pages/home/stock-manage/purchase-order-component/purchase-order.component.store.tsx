import { IPurchaseOrderState, ModalType } from './purchase-order.interface';
import { useService, useStateStore } from '~/framework/aop/hooks/use-base-store';
import React, { useEffect } from 'react';
import { ShowNotification } from '~/framework/util/common';
import { StockManageService } from '~/solution/model/services/stock-manage.service';
import { Form, Modal } from 'antd';
import moment from 'moment';
import { ExclamationCircleOutlined } from '@ant-design/icons';

export function usePurchaseOrderStore() {
  const { state, setStateWrap, getState } = useStateStore(new IPurchaseOrderState());
  const stockManageService: StockManageService = useService(StockManageService);
  const [searchForm] = Form.useForm();

  useEffect(() => {
    initSearchform();
    getTableData();
  }, []);

  function getTableData() {
    setStateWrap({ isLoading: true });
    const { pageIndex, pageSize, timeInfo } = getState();
    stockManageService
      .queryPurchaseList({
        ...searchForm.getFieldsValue(),
        beginTime: timeInfo[0] ? moment(timeInfo[0]).valueOf() : 0,
        endTime: timeInfo[1] ? moment(timeInfo[1]).valueOf() : 0,
        index: pageIndex,
        size: pageSize
      })
      .subscribe(
        res => {
          setStateWrap({
            tableData: res.purchasePagedList?.dataList,
            total: res.total,
            isLoading: false,
            sumAmount: res.sumAmount,
            sumNumber: res.sumNumber
          });
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

  function callbackAction<T>(actionType: number, data?: T) {
    setStateWrap({ currentId: data?.id || '' });
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
          title: '是否确认删除该采购单？删除后无法恢复',
          icon: <ExclamationCircleOutlined />,
          centered: true,
          onOk: () =>
            new Promise((resolve, reject) => {
              stockManageService.deletePurchase(data.id).subscribe(
                (res: any) => {
                  ShowNotification.success('已删除！');
                  getTableData();
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

  function getDateTimeInfo(timeInfo: any) {
    setStateWrap({ timeInfo });
  }

  function handleModalCancel(isSuccess?: boolean) {
    setStateWrap({ editVisible: false, detailVisible: false });
    isSuccess && searchClick();
  }
  function initSearchform() {
    searchForm.resetFields();
    setStateWrap({ timeInfo: [] });
    getTableData();
  }
  return {
    state,
    searchForm,
    callbackAction,
    changeTablePageIndex,
    searchClick,
    handleModalCancel,
    getDateTimeInfo,
    initSearchform
  };
}
