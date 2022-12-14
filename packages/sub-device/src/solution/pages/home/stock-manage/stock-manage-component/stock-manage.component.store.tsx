import { IStockManageState, ModalType } from './stock-manage.interface';
import { useStateStore, useService } from '~/framework/aop/hooks/use-base-store';
import React, { useEffect } from 'react';
import { ShowNotification } from '~/framework/util/common';
import { StockManageService } from '~/solution/model/services/stock-manage.service';
import { Form, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { EventDataNode } from 'antd/lib/tree';
import { useAuthorityState } from '~/framework/aop/hooks/use-authority-state';

export function useStockManageStore(stockListState: { currentSelectNode: EventDataNode }) {
  const { state, setStateWrap, getState } = useStateStore(new IStockManageState());
  const stockManageService: StockManageService = useService(StockManageService);
  const [searchForm] = Form.useForm();
  const { $auth } = useAuthorityState();

  useEffect(() => {
    searchForm.resetFields();
    searchForm.setFieldsValue({
      state: -1,
      isAlarm: -1
    });
  }, []);

  useEffect(() => {
    if (stockListState.currentSelectNode) {
      setStateWrap(
        {
          selectedOrgId: stockListState.currentSelectNode.key as string
        },
        () => {
          searchClick();
        }
      );
    }
  }, [stockListState.currentSelectNode]);

  function getTableData() {
    setStateWrap({ isLoading: true });
    const { pageIndex, pageSize } = getState();
    stockManageService
      .queryStockDeviceList({
        ...searchForm.getFieldsValue(),
        storeId: getState().selectedOrgId,
        duration: searchForm.getFieldValue('duration') || -1,
        index: pageIndex,
        size: pageSize
      })
      .subscribe(
        res => {
          setStateWrap({
            tableData: res.pagedList.dataList,
            total: res.pagedList.total,
            isLoading: false
          });
        },
        err => {
          setStateWrap({ isLoading: false });
        }
      );
  }

  function getTotalStock() {
    stockManageService.countMaterialNumberListByStoreIds({ storeId: getState().selectedOrgId }).subscribe(res => {
      setStateWrap({ totalStock: res?.data ?? res });
    });
  }

  function searchClick() {
    setStateWrap({ pageIndex: 1 });
    getTableData();
    getTotalStock();
  }

  function onSelectRows(selectedRowKeys: any) {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
  }

  function callbackAction(actionType: number, data?: any) {
    setStateWrap({ currentId: data ? data.materialId : '' });
    switch (actionType) {
      case ModalType.ADD:
        setStateWrap({ stockInVisible: true });
        break;
      case ModalType.EDIT:
        setStateWrap({ deviceEditVisible: true });
        break;
      case ModalType.LOST:
        Modal.confirm({
          title: (
            <span>
              ????????????????????????????????????????????????<a>???????????????</a>?????????
            </span>
          ),
          centered: true,
          icon: <ExclamationCircleOutlined />,
          onOk: () =>
            new Promise((resolve, reject) => {
              stockManageService.lossMaterial(data.materialId).subscribe(
                (res: any) => {
                  ShowNotification.success('??????????????????');
                  getTableData();
                  resolve(true);
                },
                (err: any) => {
                  reject();
                }
              );
            })
        });
        break;
      case ModalType.DELETE:
        Modal.confirm({
          title: '????????????????????????????????????????????????',
          centered: true,
          icon: <ExclamationCircleOutlined />,
          onOk: () =>
            new Promise((resolve, reject) => {
              stockManageService.deleteMaterial(data.materialId).subscribe(
                (res: any) => {
                  ShowNotification.success('????????????');
                  getTableData();
                  resolve(true);
                },
                (err: any) => {
                  reject();
                }
              );
            })
        });
        break;
      case ModalType.IMPORT:
        setStateWrap({ bulkImportVisible: true });
        break;
      case ModalType.EXPORT:
        break;
      default:
        break;
    }
  }

  function changeTablePageIndex(pageIndex: number, pageSize: number) {
    setStateWrap({ pageIndex, pageSize });
    getTableData();
  }

  function initSearchform() {
    searchForm.resetFields();
    searchForm.setFieldsValue({
      state: -1,
      isAlarm: -1
    });
    searchClick();
  }

  function modalCancel(isSuccess?: boolean) {
    setStateWrap({ stockInVisible: false, bulkImportVisible: false, deviceEditVisible: false });
    isSuccess && searchClick();
  }

  return {
    state,
    searchForm,
    $auth,
    onSelectRows,
    callbackAction,
    changeTablePageIndex,
    searchClick,
    initSearchform,
    modalCancel
  };
}
