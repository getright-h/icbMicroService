import { IFenceModalViewState } from './fence-modal-view.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';

export function useFenceModalViewStore() {
    const { state, setStateWrap } = useStateStore(new IFenceModalViewState());
    return { state }
}