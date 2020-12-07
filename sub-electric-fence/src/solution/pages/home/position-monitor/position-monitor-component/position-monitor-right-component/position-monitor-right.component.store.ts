import { IPositionMonitorRightState } from './position-monitor-right.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import * as _ from 'lodash';
import { VehicleInfoParamReture } from '~/solution/model/dto/position-monitor.dto';
import { setDataAction } from '../position-monitor-redux/position-monitor-action';
import { message } from 'antd';
import { PositionMonitorContext } from '../position-monitor.component';

export function usePositionMonitorRightStore() {
  const { state, setStateWrap } = useStateStore(new IPositionMonitorRightState());
  const { reduxState, dispatch } = React.useContext(PositionMonitorContext);
  const { checkedCarData } = reduxState;
  console.log('checkedCarData', checkedCarData);

  // 追踪
  function searchCar(id: string) {
    // 寻找当前的car
    setStateWrap({
      mapbtnTrackrVisible: true
    });
  }

  function drawDrivingLine(id: string) {
    // 寻找当前的car
    setStateWrap({
      mapbtnDrivingVisible: true
    });
  }

  function setCurrentSelectCarInfo(options: VehicleInfoParamReture) {
    if (!options) {
      return;
    }

    // 添加当前的车的信息到队列中
    if (!options.deviceList.length) {
      message.info('您选中的车辆没有设备，无法在地图上显示');
      return;
    }
    options.deviceList[0].selected = true;

    let checkedCarDataInfo = checkedCarData.filter((item: VehicleInfoParamReture) => {
      return item.id !== options.id;
    });
    checkedCarDataInfo = [options, ...checkedCarDataInfo];
    setDataAction({ currentSelectCar: options, checkedCarData: checkedCarDataInfo }, dispatch);
  }

  function closeMapDrivingPage() {
    setStateWrap({
      mapbtnDrivingVisible: false
    });
  }

  function closeMapbtnPage() {
    setStateWrap({
      mapbtnTrackrVisible: false
    });
  }

  return { state, searchCar, setCurrentSelectCarInfo, closeMapbtnPage, closeMapDrivingPage, drawDrivingLine };
}
