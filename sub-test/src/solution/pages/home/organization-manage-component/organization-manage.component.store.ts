import { IOrganizationManageState } from './organization-manage.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';

export function useOrganizationManageStore() {
    const { state, setStateWrap } = useStateStore(new IOrganizationManageState());
    return { state }
}