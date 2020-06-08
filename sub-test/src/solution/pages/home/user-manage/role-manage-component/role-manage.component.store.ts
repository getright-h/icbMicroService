import { IRoleManageState } from './role-manage.interface';
import { useStateStore } from '~/framework/aop/hooks/base-store';

export function useRoleManageStore() {
    const { state, setStateWrap } = useStateStore(new IRoleManageState());
    return { state }
}