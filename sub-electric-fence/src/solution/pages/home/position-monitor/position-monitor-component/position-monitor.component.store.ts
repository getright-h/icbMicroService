import { IPositionMonitorState } from './position-monitor.interface';
import { useStateStore, useService } from '~/framework/aop/hooks/use-base-store';
import { Dispatch, useEffect } from 'react';
import moment from 'moment';
import { setDataAction } from './position-monitor-redux/position-monitor-action';
import { PositionMonitorService } from '~/solution/model/services/position-monitor.service';
import { TPositionMonitor } from '../position-monitor-component/position-monitor-redux/position-monitor-reducer';
export function usePositionMonitorStore(dispatch: Dispatch<any>, positionMonitorData: TPositionMonitor) {
  const { state, setStateWrap } = useStateStore(new IPositionMonitorState());
  const { checkedCarData, isOpenAlarmModal } = positionMonitorData;
  let { currentSelectCar } = positionMonitorData;
  const positionMonitorService: PositionMonitorService = useService(PositionMonitorService);

  function handleCancel(isClose = false) {
    setStateWrap({
      isModalVisible: isClose
    });
  }
  useEffect(() => {
    queryMonitorAlarmInfoPagedList();
  }, []);
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
    queryMonitorAlarmInfoPagedList();
  }

  function queryMonitorAlarmInfoPagedList() {
    // 刷新当前的报警信息条数
    positionMonitorService.queryMonitorAlarmInfoPagedList({ index: 1, size: 10, isSettle: false }).subscribe(res => {
      setDataAction({ totalAlermManage: res.count }, dispatch);
    });
  }
  return { state, refreshContentInfo, handleCancel };
}
