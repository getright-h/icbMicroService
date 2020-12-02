import { IPositionMonitorMapbtnDrivingLineState } from './position-monitor-mapbtn-driving-line.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';

export function usePositionMonitorMapbtnDrivingLineStore() {
    const { state, setStateWrap } = useStateStore(new IPositionMonitorMapbtnDrivingLineState());
    return { state }
}