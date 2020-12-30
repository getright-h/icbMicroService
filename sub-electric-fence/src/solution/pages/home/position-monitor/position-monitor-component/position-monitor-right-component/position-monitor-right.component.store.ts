import { IPositionMonitorRightState } from './position-monitor-right.interface';
import { useStateStore, useService } from '~/framework/aop/hooks/use-base-store';
import * as _ from 'lodash';
import { VehicleInfoParamReture } from '~/solution/model/dto/position-monitor.dto';
import { setDataAction } from '../position-monitor-redux/position-monitor-action';
import { message } from 'antd';
import { PositionMonitorContext } from '../position-monitor.component';
import { PositionMonitorService } from '~/solution/model/services/position-monitor.service';

export function usePositionMonitorRightStore() {
  const { state, setStateWrap } = useStateStore(new IPositionMonitorRightState());
  const { reduxState, dispatch } = React.useContext(PositionMonitorContext);
  const { checkedCarData } = reduxState;
  const positionMonitorService: PositionMonitorService = useService(PositionMonitorService);
  console.log('checkedCarData', checkedCarData);

  // 追踪
  function searchCar(marker: VehicleInfoParamReture) {
    setDataAction({ currentDoActionCarInfo: marker }, dispatch);
    // 寻找当前的car
    setStateWrap({
      mapbtnTrackrVisible: true
    });
  }

  //轨迹
  function drawDrivingLine(marker: VehicleInfoParamReture) {
    setDataAction({ currentDoActionCarInfo: marker }, dispatch);
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
    const vehicleIdList: string[] = [options.id];

    // 获取到相应的设备的地址信息
    positionMonitorService.queryVehicleInfoByParam({ vehicleIdList }).subscribe(res => {
      let checkedCarDataInfo = checkedCarData.filter((item: VehicleInfoParamReture) => {
        return item.id !== res[0].id;
      });
      checkedCarDataInfo = [...res, ...checkedCarDataInfo];
      setDataAction({ currentSelectCar: res[0], checkedCarData: checkedCarDataInfo }, dispatch);
    });
  }

  function closeMapDrivingPage() {
    setStateWrap({
      mapbtnDrivingVisible: false
    });
  }

  // 控制指令
  function controllerDirectiveModal(isClose = true, deviceCode = '') {
    console.log('isClose', isClose);

    setStateWrap({
      modalDirectiveVisible: isClose,
      deviceId: deviceCode
    });
  }

  function closeMapbtnPage() {
    setStateWrap({
      mapbtnTrackrVisible: false
    });
  }

  return {
    state,
    searchCar,
    controllerDirectiveModal,
    setCurrentSelectCarInfo,
    closeMapbtnPage,
    closeMapDrivingPage,
    drawDrivingLine
  };
}
