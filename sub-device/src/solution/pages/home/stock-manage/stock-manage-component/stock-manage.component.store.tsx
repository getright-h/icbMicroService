import { IStockManageState, ModalType } from './stock-manage.interface';
import { useStateStore, useService } from '~/framework/aop/hooks/use-base-store';
import React, { useEffect } from 'react';
import { ShowNotification } from '~/framework/util/common';
import { StockManageService } from '~/solution/model/services/stock-manage.service';
import { Form, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { EventDataNode } from 'antd/lib/tree';

export function useStockManageStore(stockListState: { currentSelectNode: EventDataNode }) {
  const { state, setStateWrap, getState } = useStateStore(new IStockManageState());
  const stockManageService: StockManageService = useService(StockManageService);
  const [searchForm] = Form.useForm();

  useEffect(() => {
    initSearchform();
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
            totalStock: res.totalNumber,
            isLoading: false
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
              是否确认设备已遗失？遗失设备可在<a>设备路线表</a>中查看
            </span>
          ),
          centered: true,
          icon: <ExclamationCircleOutlined />,
          onOk: () =>
            new Promise((resolve, reject) => {
              stockManageService.lossMaterial(data.materialId).subscribe(
                (res: any) => {
                  ShowNotification.success('遗失已上报！');
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
      case ModalType.DELETE:
        Modal.confirm({
          title: '是否确认删除设备？删除后无法恢复',
          centered: true,
          icon: <ExclamationCircleOutlined />,
          onOk: () =>
            new Promise((resolve, reject) => {
              stockManageService.deleteMaterial(data.materialId).subscribe(
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
    setStateWrap({ pageIndex: 1 });
    getTableData();
  }

  function modalCancel(isSuccess?: boolean) {
    setStateWrap({ stockInVisible: false, bulkImportVisible: false, deviceEditVisible: false });
    isSuccess && searchClick();
  }

  return {
    state,
    searchForm,
    onSelectRows,
    callbackAction,
    changeTablePageIndex,
    searchClick,
    initSearchform,
    modalCancel
  };
}
