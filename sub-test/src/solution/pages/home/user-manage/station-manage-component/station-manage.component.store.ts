import { IStationManageState } from './station-manage.interface';
import { useStateStore } from '~/framework/aop/hooks/base-store';

export function useStationManageStore() {
    const { state, setStateWrap } = useStateStore(new IStationManageState());
    return { state }
}