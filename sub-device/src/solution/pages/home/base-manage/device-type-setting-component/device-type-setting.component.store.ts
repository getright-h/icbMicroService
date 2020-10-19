import { IDeviceTypeSettingState } from './device-type-setting.interface';
import { ModalType } from '../base-manage.const';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { Form } from 'antd';
import { ShowNotification } from '~/framework/util/common';
import { DeviceTypeService } from '~/solution/model/services/device-type.service';
import { useEffect } from 'react';
import { Subscription } from 'rxjs';

export function useDeviceTypeSettingStore() {
  const { state, setStateWrap } = useStateStore(new IDeviceTypeSettingState());
  const deviceTypeService: DeviceTypeService = new DeviceTypeService();
  let queryStockDevicePagedListSubscription: Subscription;
  // 获取设备型号列表
  function getTableList() {
    const { searchForm } = state;
    deviceTypeService.queryStockDevicePagedList(searchForm).subscribe(
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
        setStateWrap({ addDeviceTypeVisible: true });
        break;
    }
  }

  function handleCloseVisible() {
    setStateWrap({
      addDeviceTypeVisible: false
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
