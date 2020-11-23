import { IIDrapChooseState } from './i-drap-choose.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';

export function useIDrapChooseStore() {
    const { state, setStateWrap } = useStateStore(new IIDrapChooseState());
    return { state }
}