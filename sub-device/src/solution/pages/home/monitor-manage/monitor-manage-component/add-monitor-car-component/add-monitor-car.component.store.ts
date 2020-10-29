import { IAddMonitorCarState, IAddMonitorCarProps } from './add-monitor-car.interface';
import { useStateStore, useService } from '~/framework/aop/hooks/use-base-store';
import { DrapChooseLoadingService } from '~/solution/model/services/drap-choose-loading.service';
import { MonitorService } from '~/solution/model/services/monitor.service';
import { useEffect } from 'react';
import { Subscription } from 'rxjs';
import { DataNode } from 'rc-tree/lib/interface';
import { getCheckedList } from '~/framework/util/common/treeFunction';
import { Form } from 'antd';

export function useAddMonitorCarStore(porps: IAddMonitorCarProps) {
  const { state, setStateWrap } = useStateStore(new IAddMonitorCarState());
  const drapChooseLoadingService = useService(DrapChooseLoadingService);
  const monitorService = useService(MonitorService);
  const [form] = Form.useForm();
  let getCartDeviceListSubscription: Subscription;
  let insertVehicleGroupSubscription: Subscription;
  let calculationMonitorVehicleNumberSubscription: Subscription;
  useEffect(() => {
    return () => {
      getCartDeviceListSubscription && getCartDeviceListSubscription.unsubscribe();
    };
  });
  function getCartDeviceList(type: string) {
    getCartDeviceListSubscription = drapChooseLoadingService
      .queryVehiclePagedList({ index: 1, size: 100 })
      .subscribe((res: any) => {
        setStateWrap({
          [`${type}CarDeviceList`]:
            [
              ...res.dataList,
              { id: 1, vinNo: 'xxxxxx' },
              { id: 8, vinNo: 'xxxxxx1' },
              { id: 6, vinNo: 'xxxxxx2' },
              { id: 5, vinNo: 'xxxxxx3' },
              { id: 4, vinNo: 'xxxxxx5' },
              { id: 3, vinNo: 'xxxxxx9' }
            ] || []
        });
      });
  }
  function calculationMonitorVehicleNumber() {
    const { organizationCodeList, checkedKeys, addChoseList = [], delChoseList = [] } = state;
    const params = {
      groupId: porps.groupId || '40105ebae7c7c7551b2308d87064ff23',
      organizationIdList: organizationCodeList,
      vehicleVinNoList: addChoseList,
      removeList: delChoseList
    };
    calculationMonitorVehicleNumberSubscription = monitorService
      .calculationMonitorVehicleNumber(params)
      .subscribe((res: any) => {
        setStateWrap({
          selectedVehicleCount: res.selectedVehicleCount || 0,
          totalVehicleCount: res.totalVehicleCount || 0
        });
      });
  }

  function insertVehicleGroup() {
    const { organizationCodeList, checkedKeys, addChoseList = [], delChoseList = [] } = state;
    const params = {
      groupId: porps.groupId || '40105ebae7c7c7551b2308d87064ff23',
      organizationIdList: organizationCodeList,
      vehicleVinNoList: addChoseList,
      removeList: delChoseList
    };
    insertVehicleGroupSubscription = monitorService.insertMonitorVehicle(params).subscribe((res: any) => {
      console.log(res);
    });
  }

  function onSelectCar(value: any, type: string) {
    let { addChoseList = [], delChoseList = [] } = state;
    if (type === 'add') {
      addChoseList = value;
    } else {
      delChoseList = value;
    }
    for (let i = 0; i < addChoseList.length; i++) {
      for (let j = 0; j < delChoseList.length; j++) {
        if (addChoseList[i] == delChoseList[j]) {
          // add 的操作优先级更大
          if (type === 'del') {
            addChoseList.splice(i, 1);
            delChoseList.splice(j, 1);
          } else {
            delChoseList.splice(j, 1);
          }
        }
      }
    }

    setStateWrap({
      addChoseList,
      delChoseList
    });
    calculationMonitorVehicleNumber();
  }
  function onExpand(expandedKeys: []) {
    setStateWrap({
      expandedKeys
    });
  }
  function onCheck(treeData: DataNode[], checkedKeys: any = state.checkedKeys) {
    const checkedObject = getCheckedList(treeData, checkedKeys);
    console.log(checkedObject);
    setStateWrap({
      checkedKeys,
      checkedObject,
      organizationCodeList: checkedObject.map((device: any) => device.organizationId)
    });
    calculationMonitorVehicleNumber();
  }
  return { state, form, getCartDeviceList, onSelectCar, onExpand, onCheck, insertVehicleGroup };
}
