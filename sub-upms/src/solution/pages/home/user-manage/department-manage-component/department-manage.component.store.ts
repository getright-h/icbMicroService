import { IDepartmentManageState } from './department-manage.interface';
import { useStateStore } from '~/framework/aop/hooks/base-store';

export function useDepartmentManageStore() {
    const { state, setStateWrap } = useStateStore(new IDepartmentManageState());
    return { state }
}