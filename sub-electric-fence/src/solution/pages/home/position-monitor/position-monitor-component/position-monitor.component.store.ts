import { IPositionMonitorState } from './position-monitor.interface';
import { useStateStore, useService } from '~/framework/aop/hooks/use-base-store';
import { Dispatch } from 'react';
import moment from 'moment';
import { setDataAction } from './position-monitor-redux/position-monitor-action';
import { PositionMonitorService } from '~/solution/model/services/position-monitor.service';
import { TPositionMonitor } from '../position-monitor-component/position-monitor-redux/position-monitor-reducer';
export function usePositionMonitorStore(dispatch: Dispatch<any>, positionMonitorData: TPositionMonitor) {
  const { state } = useStateStore(new IPositionMonitorState());
  const { checkedCarData } = positionMonitorData;
  let { currentSelectCar } = positionMonitorData;
  const positionMonitorService: PositionMonitorService = useService(PositionMonitorService);

  function refreshContentInfo() {
    const vehicleIdList: string[] = [];
    checkedCarData.length &&
      checkedCarData.forEach(item => {
        vehicleIdList.push(item.id);
      });
    if (vehicleIdList.length) {
      positionMonitorService.queryVehicleInfoByParam({ vehicleIdList }).subscribe(res => {
        if (currentSelectCar) {
          for (const iterator of res) {
            if (currentSelectCar && iterator.id == currentSelectCar.id) {
              currentSelectCar = iterator;
              break;
            }
          }
        }
        setDataAction({ currentSelectCar, checkedCarData: res, refreshTime: moment().format('h:mm:ss') }, dispatch);
      });
    }
  }
  return { state, refreshContentInfo };
}
