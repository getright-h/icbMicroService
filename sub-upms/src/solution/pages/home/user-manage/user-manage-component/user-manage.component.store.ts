import { IUserManageState } from './user-manage.interface';
import { useStateStore } from '~/framework/aop/hooks/base-store';

export function useUserManageStore() {
    const { state, setStateWrap } = useStateStore(new IUserManageState());
    return { state }
}