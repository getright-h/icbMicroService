import { IPositionMonitorDrawerRightState } from './position-monitor-drawer-right.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { PositionMonitorContext } from '../position-monitor.component';
import { setDataAction } from '../position-monitor-redux/position-monitor-action';
import { VehicleInfoParamReture } from '~/solution/model/dto/position-monitor.dto';
import { DeviceList } from '../../../../../model/dto/position-monitor.dto';

export function usePositionMonitorDrawerRightStore() {
  const { state, setStateWrap } = useStateStore(new IPositionMonitorDrawerRightState());
  const { reduxState, dispatch } = React.useContext(PositionMonitorContext);
  const { checkedCarData, currentSelectCar } = reduxState;
  function deleteChoosedCar(item: any) {
    let filterCheckedCarData: any[] = [];
    let currentSelectCarData = currentSelectCar;
    filterCheckedCarData = checkedCarData.filter((checkedCarDataChild: any) => {
      return checkedCarDataChild.id !== item.id;
    });
    if (item.id == currentSelectCar?.id) {
      currentSelectCarData = undefined;
    }

    setDataAction({ checkedCarData: filterCheckedCarData, currentSelectCar: currentSelectCarData }, dispatch);
  }

  function checkedDevice(item: VehicleInfoParamReture, itemChild: any) {
    item.deviceList = item.deviceList.map((itemElement: DeviceList) => {
      if (itemElement.deviceCode == itemChild.deviceCode) {
        itemElement.selected = true;
      } else {
        itemElement.selected = false;
      }
      return itemElement;
    });
    item.changeTime = new Date().getTime();

    setDataAction({ currentSelectCar: { ...item } }, dispatch);
  }
  return { state, deleteChoosedCar, checkedDevice };
}
