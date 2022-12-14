import { IAddMonitorCarState, IAddMonitorCarProps } from './add-monitor-car.interface';
import { useStateStore, useService } from '~/framework/aop/hooks/use-base-store';
import { DrapChooseLoadingService } from '~/solution/model/services/drap-choose-loading.service';
import { MonitorService } from '~/solution/model/services/monitor.service';
import { useEffect } from 'react';
import { Subscription } from 'rxjs';
import { DataNode } from 'rc-tree/lib/interface';
import { getCheckedList } from '~/framework/util/common/treeFunction';
import { Form } from 'antd';
import { ShowNotification } from '~/framework/util/common';

export function useAddMonitorCarStore(porps: IAddMonitorCarProps) {
  const { state, setStateWrap } = useStateStore(new IAddMonitorCarState());
  const drapChooseLoadingService = useService(DrapChooseLoadingService);
  const monitorService = useService(MonitorService);
  const [form] = Form.useForm();
  let insertVehicleGroupSubscription: Subscription;
  let getDelCartDeviceListSubscription: Subscription;
  let calculationMonitorVehicleNumberSubscription: Subscription;
  useEffect(() => {
    console.log(11);
    return () => {
      insertVehicleGroupSubscription && insertVehicleGroupSubscription.unsubscribe();
      getDelCartDeviceListSubscription && getDelCartDeviceListSubscription.unsubscribe();
      calculationMonitorVehicleNumberSubscription && calculationMonitorVehicleNumberSubscription.unsubscribe();
    };
  }, [porps.addMonitorModal]);
  function getDelCartDeviceList() {
    getDelCartDeviceListSubscription = drapChooseLoadingService
      .queryVehicleByDistributorList({ distributorIdList: state.checkedKeys })
      .subscribe((res: any) => {
        setStateWrap({
          delCarDeviceList: [...res] || []
        });
      });
  }
  function calculationMonitorVehicleNumber(state: any) {
    const { checkedKeys, addChoseList = [], delChoseList = [] } = state;
    const params = {
      groupId: porps.groupId,
      organizationIdList: checkedKeys,
      vehicleVinNoList: addChoseList,
      removeList: delChoseList
    };
    console.log(params);
    if (!params.groupId) {
      ShowNotification.warning('??????????????????!');
      return;
    }
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
    const { checkedKeys, addChoseList = [], delChoseList = [] } = state;
    const params = {
      groupId: porps.groupId,
      organizationIdList: checkedKeys,
      vehicleVinNoList: addChoseList,
      removeList: delChoseList
    };
    if (!params.groupId) {
      ShowNotification.warning('??????????????????!');
      return;
    }
    setStateWrap({ confirmLoading: true });
    insertVehicleGroupSubscription = monitorService.insertMonitorVehicle(params).subscribe(
      (res: any) => {
        setStateWrap({ confirmLoading: false });
        ShowNotification.success('????????????!');
        porps.colse && porps.colse();
        porps.getMonitorGroupList && porps.getMonitorGroupList();
      },
      (error: any) => {
        setStateWrap({ confirmLoading: false });
      }
    );
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
          // add ????????????????????????
          if (type === 'del') {
            addChoseList.splice(i, 1);
            delChoseList.splice(j, 1);
          } else {
            delChoseList.splice(j, 1);
          }
        }
      }
    }

    setStateWrap(
      {
        addChoseList,
        delChoseList
      },
      (state: any) => calculationMonitorVehicleNumber(state)
    );
  }
  function onExpand(expandedKeys: []) {
    setStateWrap({
      expandedKeys
    });
  }
  function onCheck(treeData: DataNode[], checkedKeys: any = state.checkedKeys) {
    const checkedObject = getCheckedList(treeData, checkedKeys);
    console.log(checkedKeys);
    setStateWrap(
      {
        checkedKeys,
        checkedObject
      },
      (state: any) => calculationMonitorVehicleNumber(state)
    );
  }

  return { state, form, getDelCartDeviceList, onSelectCar, onExpand, onCheck, insertVehicleGroup };
}
