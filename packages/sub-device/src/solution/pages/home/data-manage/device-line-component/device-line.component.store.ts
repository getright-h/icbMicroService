import { IDeviceLineState } from './device-line.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { ModalType } from '~shared/constant/common.const';
import { useEffect } from 'react';
import { Form } from 'antd';
import { DeviceTypeService } from '~/solution/model/services/device-type.service';
import { ShowNotification } from '~/framework/util/common';
import { Subscription } from 'rxjs';
import { DEVICE_ROUTE, DEVICE_ROUTE_ENUM } from '~shared/constant/common.const';
import { useAuthorityState } from '~/framework/aop/hooks/use-authority-state';

export function useDeviceLineStore() {
  const { state, setStateWrap, getState } = useStateStore(new IDeviceLineState());
  const deviceTypeService: DeviceTypeService = new DeviceTypeService();
  let queryDevicePagedListSubscribable: Subscription;
  let queryVehicleInformationByCodeSubscribable: Subscription;
  const [form] = Form.useForm();
  const { $auth } = useAuthorityState();

  useEffect(() => {
    getTableData();
    return () => {
      queryDevicePagedListSubscribable && queryDevicePagedListSubscribable.unsubscribe();
      queryVehicleInformationByCodeSubscribable && queryVehicleInformationByCodeSubscribable.unsubscribe();
    };
  }, []);

  function getTableData() {
    const { searchForm } = getState();
    setStateWrap({ isLoading: true });
    queryDevicePagedListSubscribable = deviceTypeService.queryDevicePagedList(searchForm).subscribe(
      (res: any) => {
        const { dataList = [], total = 0 } = res;
        // queryVehicleInformation(dataList).then((res: any) => {
        //   for (let i = 0; i < dataList.length; i++) {
        //     for (let j = 0; j < res.length; j++) {
        //       if (res[j] && dataList[i].code == res[j].code) {
        //         dataList[i].info = res[j];
        //       }
        //     }
        //   }

        // });
        setStateWrap({ tableData: dataList, total: total, isLoading: false });
      },
      err => {
        setStateWrap({ isLoading: false });
        ShowNotification.error(err);
      }
    );
  }

  // ???????????????????????????????????????
  // ???????????????????????????,????????????????????????,???????????????,??????????????????,??????????????????
  // ?????????????????????,??????????????????????????????
  function queryVehicleInformation(list: any[]) {
    // ???????????????????????????
    const selectCar = list.filter((car: any) => car.route == DEVICE_ROUTE_ENUM.Bind).map((item: any) => item.code);
    console.log(selectCar);
    const promiseList: any[] = [];
    selectCar.forEach(item => {
      promiseList.push(
        new Promise((reslove: any, reject: any) => {
          deviceTypeService.queryVehicleInformationByCode({ deviceCode: item }).subscribe((res: any) => {
            reslove(res);
          });
        })
      );
    });
    return Promise.all([...promiseList]);
  }

  function queryVehicleInformationByCode(isExpand: boolean, record: any) {
    if (!isExpand) return;
    const { code = '' } = record;
    queryVehicleInformationByCodeSubscribable = deviceTypeService
      .queryVehicleInformationByCode({ deviceCode: code })
      .subscribe((res: any) => {
        const { ownerName = '-', carBand = '-', ownerMobile = '-' } = record;
        if (res) {
          const { tableData } = state;
          tableData.forEach((data: any) => {
            if (data.code === code) {
              data.ownerMobile = ownerMobile;
              data.ownerName = ownerName;
              data.carBand = carBand;
            }
          });
          setStateWrap({
            tableData
          });
        }
      });
  }

  function getFlowNodeDetail(code: string) {
    if (!code) Promise.reject(null);
    return new Promise((reslove: any, reject: any) => {
      deviceTypeService.queryDeviceFlowRecordInfoList({ code }).subscribe(
        (res: any) => {
          reslove(res);
        },
        (error: any) => {
          reject(error);
        }
      );
    });
  }
  function getFlowNode(data: any) {
    getFlowNodeDetail(data.code).then((res: any) => {
      setStateWrap({
        routeModalVisible: true,
        currentData: {
          ...state.currentData,
          ...data,
          flowList: res
        }
      });
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
  function searchClick() {
    const { searchForm } = state;
    searchForm.index = 1;
    setStateWrap({ searchForm });
    getTableData();
  }
  function searchClean() {
    const initParams = {
      index: 1,
      size: 10,
      route: -1,
      code: ''
    };
    form.resetFields();

    setStateWrap({
      searchForm: initParams
    });
    // const setState = new Promise((reslove, reject) => {
    //   setStateWrap({
    //     searchForm: initParams
    //   });
    //   reslove();
    // });
    // setState.then((res: any) => {
    //   getTableData();
    // });
    getTableData();
  }

  function changeTablePageIndex(index: number, pageSize: number) {
    const { searchForm } = state;
    searchForm.index = index;
    searchForm.size = pageSize;
    setStateWrap({ searchForm });
    getTableData();
  }

  function handleModalCancel() {
    setStateWrap({ visibleModal: false, routeModalVisible: false });
  }
  function openModal(type: ModalType) {
    switch (type) {
      default:
        break;
    }
  }
  return {
    state,
    form,
    $auth,
    changeTablePageIndex,
    searchClick,
    handleModalCancel,
    openModal,
    onChange,
    searchClean,
    getFlowNode,
    queryVehicleInformationByCode
  };
}
