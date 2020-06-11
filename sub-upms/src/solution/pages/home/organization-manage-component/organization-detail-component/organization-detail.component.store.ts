import { IOrganizationDetailState } from './organization-detail.interface';
import { useStateStore } from '~/framework/aop/hooks/base-store';

export function useOrganizationDetailStore() {
    const { state, setStateWrap } = useStateStore(new IOrganizationDetailState());
    return { state }
}