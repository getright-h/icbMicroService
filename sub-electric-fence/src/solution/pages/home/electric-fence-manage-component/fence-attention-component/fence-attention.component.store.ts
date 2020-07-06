import { IFenceAttentionState } from './fence-attention.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';

export function useFenceAttentionStore() {
    const { state, setStateWrap } = useStateStore(new IFenceAttentionState());
    return { state }
}