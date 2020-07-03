import { IAttentionDetailState } from './attention-detail.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';

export function useAttentionDetailStore() {
    const { state, setStateWrap } = useStateStore(new IAttentionDetailState());
    return { state }
}