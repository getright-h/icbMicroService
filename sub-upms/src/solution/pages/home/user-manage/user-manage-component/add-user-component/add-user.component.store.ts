import { IAddUserState } from './add-user.interface';
import { useStateStore } from '~/framework/aop/hooks/base-store';

export function useAddUserStore() {
    const { state, setStateWrap } = useStateStore(new IAddUserState());
    return { state }
}