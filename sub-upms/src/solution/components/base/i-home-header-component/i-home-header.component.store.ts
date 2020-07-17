import { StorageUtil } from '~/framework/util/storage';
import { HistoryService } from '~/framework/util/routes/history.service';
import { IIHomeHeaderState } from './i-home-header.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';

export function useHomeHeaderStore() {
  const { state, setStateWrap } = useStateStore(new IIHomeHeaderState());
  function logout() {
    StorageUtil.removeLocalStorage('token');
    HistoryService.getHashHistory().push('/login');
  }

  function changePwd() {
    setStateWrap({ passwordVisible: true });
  }
  function popClose() {
    setStateWrap({ passwordVisible: false });
  }

  return { state, logout, changePwd, popClose };
}
