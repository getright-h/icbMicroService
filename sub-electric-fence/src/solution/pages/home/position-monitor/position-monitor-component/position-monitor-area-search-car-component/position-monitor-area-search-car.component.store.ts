import { IPositionMonitorAreaSearchCarState } from './position-monitor-area-search-car.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';

export function usePositionMonitorAreaSearchCarStore() {
  const { state, setStateWrap } = useStateStore(new IPositionMonitorAreaSearchCarState());
  function closeAreaSearchCarPage() {
    setStateWrap({
      AreaSearchCarDrawervisible: false
    });
  }
  return { state, closeAreaSearchCarPage };
}
