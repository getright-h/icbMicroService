import { IDeviceTypeSettingState } from './device-type-setting.interface';
import { ModalType } from '../base-manage.const';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { Form, Modal } from 'antd';
import { ShowNotification } from '~/framework/util/common';
import { DeviceTypeService } from '~/solution/model/services/device-type.service';
import { useEffect } from 'react';
import { Subscription } from 'rxjs';
const { confirm } = Modal;
export function useDeviceTypeSettingStore() {
  const { state, setStateWrap } = useStateStore(new IDeviceTypeSettingState());
  const deviceTypeService: DeviceTypeService = new DeviceTypeService();
  let queryStockDevicePagedListSubscription: Subscription;
  // 获取设备型号列表
  function getTableList() {
    const { searchForm } = state;
    deviceTypeService.queryDeviceTypePagedList(searchForm).subscribe(
      (res: any) => {
        console.log(res);
        setStateWrap({ tableData: res.dataList || [], total: res.total });
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  function searchClick() {
    const { searchForm } = state;
    searchForm.index = 1;
    setStateWrap({ searchForm });
    getTableList();
  }

  function changeTablePageIndex(index: number, pageSize: number) {
    const { searchForm } = state;
    searchForm.index = index;
    searchForm.size = pageSize;
    setStateWrap({ searchForm });
    getTableList();
  }
  function callbackAction(actionType: number, data?: any) {
    switch (actionType) {
      case ModalType.ADD:
        setStateWrap({ addDeviceTypeVisible: true, currentData: {} });
        break;
      case ModalType.ALERT:
        getDeviceTypeDetail(data.id);

        break;
      case ModalType.DEL:
        renderDelDeviceTypeModal(data);
        break;
    }
  }

  function renderDelDeviceTypeModal(data: any) {
    confirm({
      content: `确认删除设备型号${data.name || '-'}`,
      onOk: () => {
        delDeviceType(data.id).then(res => console.log(res));
      }
    });
  }

  function getDeviceTypeDetail(id: string) {
    if (!id) return;
    deviceTypeService.deviceTypeDetail({ id }).subscribe(
      (res: any) => {
        const image = res.image && [{ uid: res.image, url: res.image }];
        setStateWrap({ addDeviceTypeVisible: true, currentData: { ...res, image, actionType: ModalType.ALERT } });
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  function delDeviceType(id: string) {
    if (!id) return null;
    return new Promise((reslove: any, reject: any) => {
      deviceTypeService.deviceType({ id }).subscribe(
        res => {
          console.log(res);
          reslove(res);
        },
        error => {
          reject(error);
        }
      );
    });
  }
  function onChange(value: any, valueType: string) {
    const { searchForm } = state;
    setStateWrap({
      searchForm: {
        ...searchForm,
        [valueType]: value
      }
    });
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
  return { state, callbackAction, handleCloseVisible, getTableList, onChange, searchClick, changeTablePageIndex };
}
