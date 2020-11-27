import { IPositionMonitorDrawerRightState } from './position-monitor-drawer-right.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { PositionMonitorContext } from '../position-monitor.component';
import { setDataAction } from '../position-monitor-redux/position-monitor-action';

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
  return { state, deleteChoosedCar };
}
