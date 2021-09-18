import { IElectricFenceManageState } from './electric-fence-manage.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';

export function useElectricFenceManageStore() {
    const { state, setStateWrap } = useStateStore(new IElectricFenceManageState());
    return { state }
}