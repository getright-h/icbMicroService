import { IPositionMonitorState } from './position-monitor.interface';
import { useStateStore, useService } from '~/framework/aop/hooks/use-base-store';
import { Dispatch, useEffect, useRef } from 'react';
import moment from 'moment';
import { setDataAction } from './position-monitor-redux/position-monitor-action';
import { PositionMonitorService } from '~/solution/model/services/position-monitor.service';
import { TPositionMonitor } from '../position-monitor-component/position-monitor-redux/position-monitor-reducer';
export function usePositionMonitorStore(dispatch: Dispatch<any>, positionMonitorData: TPositionMonitor) {
  const { state, setStateWrap } = useStateStore(new IPositionMonitorState());
  const { checkedCarData } = positionMonitorData;
  let { currentSelectCar } = positionMonitorData;
  const checkedCarDataLength = useRef(0);
  const positionMonitorService: PositionMonitorService = useService(PositionMonitorService);

  function handleCancel(isClose = false) {
    setStateWrap({
      isModalVisible: isClose
    });
  }
  useEffect(() => {
    queryMonitorAlarmInfoPagedList();
  }, []);

  useEffect(() => {
    checkedCarDataLength.current = checkedCarData.length;
  }, [checkedCarData]);

  function refreshContentInfo() {
    const vehicleIdList: string[] = [];
    checkedCarData.length &&
      checkedCarData.forEach(item => {
        vehicleIdList.push(item.id);
      });
    if (vehicleIdList.length) {
      positionMonitorService.queryVehicleInfoByParam({ vehicleIdList }).subscribe(res => {
        // 为了防止刷新的时候用户在操作，避免刷新带来的数据不一致
        if (checkedCarDataLength.current == res?.length) {
          if (currentSelectCar) {
            for (const iterator of res) {
              if (currentSelectCar && iterator.id == currentSelectCar.id) {
                currentSelectCar = iterator;
                break;
              }
            }
          }
          setDataAction({ currentSelectCar, checkedCarData: res, refreshTime: moment().format('h:mm:ss') }, dispatch);
        }
      });
    }
    queryMonitorAlarmInfoPagedList();
  }

  // 暂停计时
  function stopRefresh(stopTime: boolean) {
    setStateWrap({ stopTime });
  }

  function queryMonitorAlarmInfoPagedList() {
    // 刷新当前的报警信息条数
    positionMonitorService.queryMonitorAlarmInfoPagedList({ index: 1, size: 10, isSettle: false }).subscribe(res => {
      setDataAction({ totalAlermManage: res.count }, dispatch);
    });
  }
  return { state, refreshContentInfo, handleCancel, stopRefresh };
}
