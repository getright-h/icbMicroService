import { IChildState } from './child.interface';
import { useStateStore } from '~/framework/aop/hooks/base-store';

export function useChildStore() {
    const { state, setStateWrap } = useStateStore(new IChildState());
    return { state }
}