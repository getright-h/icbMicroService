import { ISupplierSettingState } from './supplier-setting.interface';
import { ModalType } from '../base-manage.const';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { ShowNotification } from '~/framework/util/common';
import { SupplierService } from '~/solution/model/services/supplier.service';
import { useEffect } from 'react';
import { Subscription } from 'rxjs';
import { Modal } from 'antd';
const { confirm } = Modal;
export function useSupplierSettingStore() {
  const { state, setStateWrap } = useStateStore(new ISupplierSettingState());
  const supplierService: SupplierService = new SupplierService();
  let queryStockDevicePagedListSubscription: Subscription;
  // 获取供应商列表
  function getTableList() {
    const { searchForm } = state;
    supplierService.querySupplierList(searchForm).subscribe(
      (res: any) => {
        console.log(res);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  function callbackAction(actionType: number, data?: any) {
    switch (actionType) {
      case ModalType.ADD:
        setStateWrap({ addSupplierVisible: true });
        break;
    }
  }

  function handleCloseVisible() {
    setStateWrap({
      addSupplierVisible: false
    });
  }
  useEffect(() => {
    getTableList();
    return () => {
      queryStockDevicePagedListSubscription && queryStockDevicePagedListSubscription.unsubscribe();
    };
  }, []);
  return { state, callbackAction, handleCloseVisible, getTableList };
}
