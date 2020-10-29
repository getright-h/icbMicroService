import { IAddApprovalLineState } from './add-approval-line.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';

export function useAddApprovalLineStore() {
    const { state, setStateWrap } = useStateStore(new IAddApprovalLineState());
    return { state }
}